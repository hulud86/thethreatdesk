const quiz = {
  week: "2026-11-23",
  title: "Week of November 23",
  questions: [
    {q: "According to Accenture, how quickly did attackers gain root on a vulnerable Mitel MiCollab server?",
     options: ["About two weeks", "Within about half an hour", "Only after a user opened a phishing email", "They never gained root"],
     answer: 1,
     explain: "Commands ran 12 minutes after the first request and root followed within roughly 30 minutes, a day before Mitel's advisory."},
    {q: "What did Hex, the Elixir and Erlang package registry, say it could NOT rule out after attackers ran commands on hex.pm servers?",
     options: ["That packages were tampered with", "That database contents such as password hashes and 2FA secrets were read", "That the attackers still had access", "That the CDN was replaced"],
     answer: 1,
     explain: "Hex found no modified packages or lasting access, but database reads are not logged, so exposure of emails, hashes and 2FA secrets cannot be excluded."},
    {q: "How does Todoist believe the attacker got the employee credentials used in its breach?",
     options: ["A SIM swap", "Most likely infostealer malware", "A leaked backup tape", "A vulnerability in its mobile app"],
     answer: 1,
     explain: "Todoist says the employee was most likely hit by infostealer malware, though it has not confirmed how the credentials were obtained."},
    {q: "What should Radware Cloud WAF customers rotate after the company's breach?",
     options: ["Their TLS certificates", "The keys and passwords used to export WAF logs to AWS, Azure or SFTP", "Their domain registrar password", "Nothing, no customer data was involved"],
     answer: 1,
     explain: "An unprotected management API exposed log-export credentials for some customers, and some saw AWS alerts about an unknown IP probing their buckets."},
    {q: "What setting blocks the known no-login path in the unpatched Cacti '4HTTP2ROOT' bug?",
     options: ["Turning off SNMP polling", "Disabling the anonymous guest account", "Enabling HTTPS", "Switching to a MySQL database"],
     answer: 1,
     explain: "The SQL injection is reachable without a login only when guest access is enabled. Disabling it blocks the demonstrated path but does not fix the bug."}
  ]
};
