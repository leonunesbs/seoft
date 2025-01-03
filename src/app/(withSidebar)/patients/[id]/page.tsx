import { MdOutlineHistory, MdOutlineUploadFile } from "react-icons/md";

import { AddEvaluationButton } from "~/components/atoms/add-evaluation-button";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { PageHeading } from "~/components/atoms/page-heading";
import { PatientForm } from "~/components/organisms/patient-form";
import { Separator } from "~/components/ui/separator";
import { db } from "~/server/db";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;
export default async function Patient({ params }: { params: Params }) {
  const { id } = await params;

  const patient = await db.patient.findUnique({
    where: { id },
    include: {
      evaluations: {
        include: {
          collaborator: { select: { name: true } },
          clinic: { select: { name: true } },
        },
      },
    },
  });

  if (!patient) return notFound();
  return (
    <div className="pl-2">
      <div className="mb-4 flex items-center justify-between">
        <PageHeading>Detalhes do Paciente</PageHeading>
        <div className="flex gap-2">
          {/* Botão para reabrir a avaliação */}

          <Button asChild variant={"outline"}>
            <Link href={`/patients/${patient.id}/history`}>
              <MdOutlineHistory />
              Histórico
            </Link>
          </Button>

          <AddEvaluationButton
            patientId={patient.id}
            patientName={patient.name}
            variant={"default"}
            customChildren={
              <>
                <MdOutlineUploadFile />
                Nova Avaliação
              </>
            }
            customLoading={
              <>
                <Loader2 className="animate-spin" />
                Carregando...
              </>
            }
          />
        </div>
      </div>

      <PatientForm
        initialData={{
          id: patient.id,
          refId: patient.refId,
          name: patient.name,
          birthDate: patient.birthDate.toISOString(),
        }}
      />
      <Separator className="my-4" />
      <div>
        <h2 className="text-xl font-bold">Evaluation History</h2>
        <ul>
          {patient.evaluations.map((evaluation) => (
            <li key={evaluation.id} className="my-2 border p-4">
              <p>
                <strong>Collaborator:</strong>{" "}
                {evaluation.collaborator?.name || "Unknown"}
              </p>
              <p>
                <strong>Clinic:</strong> {evaluation.clinic?.name || "Unknown"}
              </p>
              <p>
                <strong>Diagnosis:</strong> {evaluation.diagnosis || "N/A"}
              </p>
              <p>
                <strong>Treatment:</strong> {evaluation.treatment || "N/A"}
              </p>
              <p>
                <strong>Follow Up:</strong> {evaluation.followUp || "N/A"}
              </p>
              <p>
                <strong>Next Appointment:</strong>{" "}
                {evaluation.nextAppointment || "N/A"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(evaluation.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {evaluation.done ? "Completed" : "Pending"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
