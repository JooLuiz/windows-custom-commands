document.addEventListener("DOMContentLoaded", async () => {
    const uuid = new URLSearchParams(window.location.search).get('uuid');

    if (uuid) {
        let currentJob;

        await $.getJSON("scheduled_tasks", function (data) {
            data.forEach((job) => {
                if (job.uuid === uuid) {
                    currentJob = job;
                }
            });
        });

        if (currentJob) {
            document.getElementById("hostName").textContent = currentJob["Nome do host"];
            document.getElementById("taskName").textContent = currentJob["Nome da tarefa"];
            document.getElementById("nextRunTime").textContent = currentJob["Hora da próxima execução"];
            document.getElementById("status").textContent = currentJob["Status"];
            document.getElementById("logonMode").textContent = currentJob["Modo de Logon"];
            document.getElementById("lastRunTime").textContent = currentJob["Horário da última execução"];
            document.getElementById("lastResult").textContent = currentJob["Último resultado"];
            document.getElementById("author").textContent = currentJob["Autor"];
            document.getElementById("taskToRun").textContent = currentJob["Tarefa a ser executada"];
            document.getElementById("startIn").textContent = currentJob["Iniciar em"];
            document.getElementById("comment").textContent = currentJob["Comentário"];
            document.getElementById("scheduledTaskState").textContent = currentJob["Estado de tarefa agendada"];
            document.getElementById("idleTime").textContent = currentJob["Tempo Ocioso"];
            document.getElementById("powerManagement").textContent = currentJob["Gerenciamento de Energia"];
            document.getElementById("runAsUser").textContent = currentJob["Executar como Usuário"];
            document.getElementById("deleteTask").textContent = currentJob["Excluir tarefa se não for reagendada"];
            document.getElementById("stopTask").textContent = currentJob["Interromper tarefa se for executada X horas e X minutos"];
            document.getElementById("schedule").textContent = currentJob["Agendar"];
            document.getElementById("scheduleType").textContent = currentJob["Tipo de Agendamento"];
            document.getElementById("startTime").textContent = currentJob["Hora de início"];
            document.getElementById("startDate").textContent = currentJob["Data de início"];
            document.getElementById("endDate").textContent = currentJob["Data de término"];
            document.getElementById("days").textContent = currentJob["Dias"];
            document.getElementById("months").textContent = currentJob["Meses"];
            document.getElementById("repeatEvery").textContent = currentJob["Repetir: a cada"];
            document.getElementById("repeatUntilTime").textContent = currentJob["Repetir: até: horário"];
            document.getElementById("repeatUntilDuration").textContent = currentJob["Repetir: até: duração"];
            document.getElementById("repeatStop").textContent = currentJob["Repetir: parar se ainda estiver em execução"];
        }
    }

    document.getElementById("backButton").addEventListener("click", () => {
        window.location.href = "/table";
    });
});
