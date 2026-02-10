const summarizeBtn = document.getElementById('summarizeBtn');
const aiOutput = document.getElementById('aiOutput');

if (summarizeBtn && aiOutput) {
  summarizeBtn.addEventListener('click', () => {
    aiOutput.innerHTML = `
      <strong>KI-Kurzfassung:</strong>
      <p>Der Fokus liegt auf einem MVP bis Ende Q2. Die zentralen nächsten Schritte sind die Finalisierung der API-Architektur, ein Design-Review und die Vorbereitung von Pricing-Tests.</p>
      <ul>
        <li><strong>Kernpunkt 1:</strong> MVP-Termin ist priorisiert.</li>
        <li><strong>Kernpunkt 2:</strong> Drei operative To-Dos sind offen.</li>
        <li><strong>Kernpunkt 3:</strong> Frühes Nutzerfeedback soll zeitnah eingeholt werden.</li>
      </ul>
    `;
  });
}
