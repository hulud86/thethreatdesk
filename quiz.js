const quiz = {
  week: "2026-11-16",
  title: "Week of November 16",
  questions: [
    {q: "How did attackers get malicious code onto CNN, BBC and Zoom pages on Nov 16?",
     options: ["They hacked each site's web server", "They abused a flaw in Optimizely's signup flow to alter hosted scripts", "They poisoned a DNS provider", "They bought ads that carried malware"],
     answer: 1,
     explain: "Optimizely says an attacker exploited its Experimentation signup flow and injected code that its CDN then served to 178 organizations' sites."},
    {q: "Java4Shell only affects Java running on which kind of hardware?",
     options: ["Any ARM64 server", "x86-64 chips with AVX-512 VBMI", "Apple Silicon Macs", "32-bit Windows PCs"],
     answer: 1,
     explain: "The flaw is in a fast Base64 decoder used only on x86-64 CPUs with AVX-512 VBMI, such as Intel Ice Lake and AMD Zen 4 and newer."},
    {q: "After upgrading to a fixed NGINX version for NGINX2Root, what else must you do?",
     options: ["Nothing; a config reload is enough", "Fully restart NGINX or do a live binary upgrade", "Rotate your TLS certificates", "Reinstall the operating system"],
     answer: 1,
     explain: "A reload keeps the old binary running. You need a full restart or a live binary upgrade for the fix to take effect."},
    {q: "How long were the malicious agent-framework releases live on PyPI?",
     options: ["About 45 minutes", "About a week", "About a month", "They are still live"],
     answer: 0,
     explain: "Versions 1.26.1 and 1.26.2 were up for roughly 8:35 to 9:20 p.m. UTC on Nov 17 before being quarantined."},
    {q: "What is the simplest defense against the new TPM lockout bypass for Windows Hello and BitLocker?",
     options: ["Turn off the TPM", "Use longer PINs", "Switch to a password manager", "Disable Secure Boot"],
     answer: 1,
     explain: "The attack lets someone guess PINs without lockout, so each extra digit makes guessing ten times slower."}
  ]
};
