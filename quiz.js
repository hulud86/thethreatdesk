const quiz = {
  week: "2026-11-14",
  title: "Week of November 9",
  questions: [
    {q: "How many security fixes did Microsoft ship in its November 2026 Patch Tuesday?",
     options: ["99", "216", "1,094", "63"],
     answer: 2,
     explain: "Microsoft released 1,094 fixes. 63 were rated critical, and one was already under attack."},
    {q: "Which Microsoft app had the zero-day that attackers were already exploiting?",
     options: ["Teams", "Outlook", "Excel", "Edge"],
     answer: 1,
     explain: "An Outlook spoofing flaw could leak hashed Windows login credentials. CISA set a Nov 24 deadline for federal agencies."},
    {q: "Chrome just patched its eighth exploited zero-day of 2026. What should you do after the update downloads?",
     options: ["Clear your cookies", "Switch to incognito mode", "Restart Chrome so the update applies", "Uninstall and reinstall Chrome"],
     answer: 2,
     explain: "Chrome downloads fixes on its own, but they only take effect once you restart the browser."},
    {q: "What did attackers steal in the DreamHost breach?",
     options: ["Credit card numbers", "FTP logins and webmail sessions", "Domain names", "Nothing; it was a false alarm"],
     answer: 1,
     explain: "A flaw in DreamHost's web File Manager let an attacker collect FTP and SFTP passwords and some webmail sessions from August to Oct 23."},
    {q: "About how many customers were affected by the Iris Ohyama cloud breach?",
     options: ["77,000", "770,000", "7.7 million", "77 million"],
     answer: 2,
     explain: "Data on about 7.7 million customers was exposed, including names, addresses and account passwords."}
  ]
};
