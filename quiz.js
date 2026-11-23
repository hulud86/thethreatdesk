const quiz = {
  week: "2026-11-23",
  title: "Week of November 23",
  questions: [
    {q: "How did researchers reach the Ghostscript sandbox-escape bug (CVE-2026-125396) over the network?",
     options: ["Only by logging in to the server over SSH", "Through print jobs, webmail attachments and web upload forms", "By sending a crafted DNS query", "Through a malicious browser extension"],
     answer: 1,
     explain: "pwn.ai reached it via an anonymous print job, a Roundcube attachment and WordPress plugin upload forms, because image libraries quietly hand files to Ghostscript."},
    {q: "What triggers the critical GPGME double free, CVE-2026-129975?",
     options: ["A malformed TLS certificate", "An OpenPGP key with an extremely long user ID", "A corrupted ZIP archive", "An oversized email subject line"],
     answer: 1,
     explain: "A malicious OpenPGP key with a very long user ID triggers the bug. GPGME 2.3.1 and Gpg4win 5.1.2 fix it."},
    {q: "How did Dragos discover that prompts sent to AI inference providers were being stolen?",
     options: ["By reverse-engineering provider apps", "By seeding about 2 million prompts with canary links and fake credentials", "By buying stolen data on a forum", "From a whistleblower inside OpenRouter"],
     answer: 1,
     explain: "Dragos planted trackable links and fake keys in prompts. When attackers opened or used them, the theft showed up."},
    {q: "What did Microsoft say attackers could read through the Entra Connect Health flaw?",
     options: ["User passwords and MFA secrets", "Admin email addresses, tenant IDs and license details", "The contents of users' mailboxes", "Azure subscription billing data"],
     answer: 1,
     explain: "The exposure was read-only tenant metadata such as admin and technical contact emails. Microsoft says no passwords, hashes or tokens were exposed."},
    {q: "What is NCIC, which the FBI is investigating as breached?",
     options: ["The FBI's employee email system", "The national crime database police query during stops and background checks", "A federal payroll system", "The FBI's public tip website"],
     answer: 1,
     explain: "The National Crime Information Center holds warrants, missing persons, stolen property and protection orders used by police nationwide."}
  ]
};
