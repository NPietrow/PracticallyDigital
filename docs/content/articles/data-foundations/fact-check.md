# Fact-check: Data foundations

Date: 24 November 2026. Checker: independent subagent. Article version: `50483ed` plus working tree (`src/content/articles/data-foundations.mdx` is untracked, so the check covers the working-tree file).

## Summary

74 claim rows checked (row 37 is editorial and has no verdict). **56 supported, 16 partly supported, 2 not supported, 0 source unreachable.** RAND blocks WebFetch, but a direct download of the PDF at the cited URL worked, so it was read in full. Several Made Smarter, Drexel and BSI PDFs timed out on direct download and were read through a second fetch route instead.

The most important problems, in order:

1. **The "preprint, not yet peer reviewed" caveat is wrong (row 29).** The factory experiment (Senoner et al.) was published in *Scientific Reports* 14, article 31150, on 28 December 2024 (DOI 10.1038/s41598-024-82501-9; full text on PubMed Central, PMC11681242). The five-fold result is in the published version. Cite the journal and drop the caveat.
2. **The metadata list is mostly not in the cited GOV.UK page (row 38).** The current "Recording metadata to describe critical data assets" page (GDS, 16 April 2026) lists creator, date created, title, description, identifier, media type, version, temporal coverage, conformance, access rights, security classification and licence. Owner, storage location, purpose, update frequency, quality or known problems, users and retention period are **not** on it. Only name, description, source (creator) and format are supported. Either find a source for the rest (the data ownership model, the data quality action plan template or the Ofgem field-level template may cover some of it) or present the list as our own.
3. **"Larger manufacturers do use AI in operations" (row 18b) is not supported.** Deloitte says its respondents span company sizes. It doesn't say they're large firms.
4. **RAND's 84% (row 5).** The figure sits in the "Findings from Industry Interviews" section, so the base is the 50 industry interviewees (42 of 50 = 84%; 84% of 65 isn't a whole number), not all 65. The article also leaves out RAND's own warning that its mostly non-managerial sample may skew the results towards blaming leaders. The brief recorded that warning as part of claim 10.
5. **Glosses added to sources:** "so a person stays accountable" (HSE, row 27); Deloitte's closed-loop definition (row 19); "when people retire" (CHIS7, row 53); the CDM "works better" than writing things down (row 54); the AMRC £400 "leaves out installation, integration, security and support" (row 73). None of these is in the cited source.
6. **Dates and bases:** the ONS wave covers 21 September to 4 October 2026, not "September 2026" (row 2). The Cambridge survey was fieldwork in September and October 2022, with the report published in February 2023 (row 68). The £13,000 and £15,000 apprenticeship caps aren't in the linked funding guide (row 71). The KTP 67% rate applies only to full-economic-cost projects (row 72).
7. **The gist** mentions digital twin projects, which the body never evidences, and leaves out leadership, which the body ranks as the top cause.

No newer BICS wave has AI questions: waves 166 to 168 (22 October, 5 November and 19 November 2026) have no AI sheets. No excluded material appears. There are no American spellings in the article's own prose.

## Claims

Verdict key: S = supported, P = partly supported, N = not supported, U = source unreachable.

| # | Article sentence (short paraphrase) | Source | Verdict | Where found / notes |
|---|---|---|---|---|
| 1 | Make UK 2026: 2% of members had AI widely embedded, 43% running limited experiments; report gives no sample size | Make UK, *AI, skills and the future of the UK manufacturing sector* (PDF created June 2026) | S | Executive summary p.3 and Chart 1 p.7. Chart category "Limited: small-scale experiments of AI tools only" = 43%. Survey of Make UK members (p.11). No n or fieldwork dates anywhere. Note the source's wording varies: p.3 calls the 37% "small pilots" and the 43% "still experimenting", while p.6 says "around half are limited to pilots or small-scale experiments". "Most who have tried AI are still experimenting" holds (43 of the 82% who have adopted) |
| 2 | "In September 2026 about 20% of UK manufacturers used some form of AI" | ONS BICS Wave 165 xlsx | P | Figure correct (see Derived figures). Wave 165 fieldwork was **21 September to 4 October 2026**, so "September 2026" is slightly off. Suggest "in late September and early October 2026" |
| 3 | Mostly images and text; 4.0% machine learning on their own data; 2.3% robotics | Same | S | Sheet "AI Current Usage TS (WTD)", Manufacturing, Wave 165: visual content 12.2%, text generation (LLMs) 10.3%, "Data processing using machine learning" 4.0%, robotics 2.3%. "On their own data" is our gloss on "data processing" |
| 4 | RAND interviewed 65 experienced data scientists and engineers | RAND RR-A2680-1 (13 August 2024) | S | p.4 Methods: 50 industry and 15 academic interviews, August to December 2023. Read from the cited PDF URL (direct download worked; WebFetch was not needed) |
| 5 | 84% named leadership failures as a primary cause | Same | P | p.5: "Eighty-four percent of our interviewees" is in the industry-findings section, so the base is the 50 industry interviewees, not 65. RAND's caveat that its mostly non-managerial sample may skew towards blaming leadership (p.3) is omitted; the brief's claim 10 included it |
| 6 | Leadership failures: wrong problem, unrealistic expectations, too little time | Same | S | pp.5 to 6 subsections: optimising for the wrong business problem, expectations, underestimating the time commitment |
| 7 | Data came second; 30 of 50 industry interviewees described persistent data quality problems | Same | S | p.7: "data-driven failures as the second most common"; "Many interviewees (30 of 50)" |
| 8 | Data kept for compliance or logging often doesn't suit AI training | Same | S | p.7, legacy datasets kept "for compliance or logging purposes". Interviewee-derived |
| 9 | Make UK 2024 survey of 151 manufacturers with Autodesk: data management 35%, behind complexity and integration 44%, cost 44%, technical 39% | Make UK/Autodesk, *Future Factories Powered by AI* | S | Methodology note (151 manufacturers, July to August 2024); Chart 6. Cybersecurity risks are **also** 35%, tied with data management |
| 10 | Non-adopters: understanding (62%) and business case (61%) well ahead of better data (41%) | DSIT/government *AI adoption research 2026* (October 2026) | S | Figure 23 and text on p.58; base: businesses neither using nor planning to use AI, unweighted n = 2,043. All sectors. The question asks what would make adoption **more likely**, not about barriers. The article's wording is fine |
| 11 | 72% of businesses handling digital data analyse it; only 46% agree analysis supports decisions | DSIT *Business data use and productivity study wave 2* | S | §3.3 (72%) and §3.10 (46%, base 3,380). Ipsos for DSIT, fieldwork December 2024 to February 2025, 3,796 businesses |
| 12 | "Many firms collect data without using it" (lead sentence for row 11) | Same | P | The statistic shows most firms do analyse their data. The gap it shows is between analysis and decisions, not between collection and use. Suggest "Many firms analyse data without it changing decisions" |
| 13 | Study of 30,000+ US plants: predictive analytics paid off only with IT, skilled people or a suitable process | Brynjolfsson, Jin and McElheran, Stanford Digital Economy Lab (working paper, 2021) | S | Abstract: survey with the US Census Bureau of 30,000+ establishments. Complements are IT capital, educated workers or flow-efficient production |
| 14 | Made Smarter AI toolkit says not to wait for perfect data | Made Smarter, *AI Adoption in Manufacturing: A Practical Toolkit* | S | p.10: "the opportunity is not to wait for perfect data" |
| 15 | NAO: government programmes often fail to deal with data at the start, causing concern and delay later | NAO HC 575, 21 July 2021 | S | Para 2.20, printed p.28 |
| 16 | 2024 survey of 300 manufacturing executives (MIT TR Insights, paid for by Microsoft): uses most likely in production were product design, chatbots, content creation | Microsoft blog, 9 April 2024 | S | Blog text: "the AI use cases most likely to have progressed through production" involve those three. The survey is **global** (300 senior executives), which is worth saying in a UK article. The page doesn't give the fieldwork year; the report was published in 2024 |
| 17 | Only about one in five had production assets with data ready for current AI | Same | S | "only approximately one in five manufacturers have production assets with data prepared…" |
| 18 | Deloitte 2026 survey of 140+ manufacturers: adoption highest in quality (62%) and production (57%) | Deloitte Switzerland, *AI in Manufacturing 2026*, 30 June 2026 | S | Survey of "more than 140 manufacturing organisations"; Quality 62%, Production 57%. Region and fieldwork not stated |
| 18b | "Larger manufacturers do use AI in operations" (framing of row 18) | Same | N | Deloitte says respondents span "industries, regions, and company sizes". Nothing supports "larger" |
| 19 | One in five use cases scaled across sites; 18% used closed-loop systems "where the AI acts without a person approving each step" | Same | P | Scaling figure and 18% "Physical AI / closed-loop systems" supported. Deloitte doesn't define closed-loop that way; the definition is ours and should be labelled or dropped |
| 20 | HSE study of 247 AI uses across 14 regulated sectors: largest category drafting H&S documents 25.1%, predictive maintenance 3.6% | Chambers et al., HSE, IChemE Hazards 35 (2025) | S | Abstract (247, 14 sectors); Figure 4 text: automatic generation of H&S documents 25.1%, predictive maintenance 3.6%. Note that 25.1% is from the low-level (zero-shot) classification. In the high-level Figure 3, "health and safety management" was 25.9% and "Other" was the largest bucket |
| 21 | Respondents kept a person approving safety-critical outputs | Same | S | "Human-in-the-loop approaches … mandatory human approval for safety-critical outputs" listed among controls respondents used; the Discussion notes "current reliance on 'human-in-the-loop' controls". Slight generalisation ("respondents" means some respondents) |
| 22 | Authors say the sample isn't statistically representative | Same | S | Discussion: "not a statistically representative sample of all HSE-regulated industries" |
| 23 | Data quality and availability was HSE respondents' most-reported challenge | Same | S | Implementation challenges section |
| 24 | MIT TR survey: poor data quality (57%) and weak integration (54%) top data barriers to scaling | Microsoft blog | S | "inadequate data quality (57%), weak data integration (54%), and insufficient governance (47%)" |
| 25 | Vendor-sponsored survey of 565 data professionals, all sectors, 9% manufacturing; 67% don't completely trust data used for decisions | Drexel LeBow and Precisely, *2025 Outlook: Data Integrity Trends and Insights* | S | pp.3, 5 and 6. Missing context: **454 of the 565 respondents were in the US**; fieldwork was in the first half of 2024 |
| 26 | Deloitte: data fifth among challenges (30%) behind cost 43%, expertise 35%, resistance 35%, regulation 34% | Deloitte | S | Implementation challenges list, in that order |
| 27 | HSE says the law requires a risk assessment for any AI use affecting workplace H&S, "so a person stays accountable" | HSE press statement, 12 June 2026 | P | Risk assessment requirement supported ("for uses of AI which impact on workplace health and [safety]"). The statement says nothing about a person staying accountable; it says those who create risk are best placed to control it. That clause is our inference |
| 28 | Factory experiment: explaining AI flags cut workers' median error rate five-fold vs unexplained AI | Senoner et al. | S | arXiv abstract and the published paper, Study 1: "five-fold decrease in the median error rate". Electronics factory, visual inspection |
| 29 | "the study is a preprint, not yet peer reviewed" | Same | N | Published in *Scientific Reports* 14:31150, 28 December 2024, DOI 10.1038/s41598-024-82501-9 (PMC11681242). Replace the arXiv link and drop the caveat |
| 30 | Government data lifecycle has six stages (as listed) | Government Data Quality Framework (3 December 2020) | S | "The data lifecycle": plan; collect or acquire, and ingest; prepare, store and maintain; use and process; share and publish; archive or destroy |
| 31 | DIKW "usually traced to Russell Ackoff's 1989 paper, with earlier versions by Milan Zeleny and Harlan Cleveland" | ISKO Encyclopedia, Frické (entry 2018, edited 2022) | P | ISKO traces the strands to T.S. Eliot and, separately, to Cleveland (1982) and the systems theorists Adler (1986), Ackoff (1989) and Zeleny (1987). It doesn't say the model is "usually traced" to Ackoff, and it treats Zeleny and Cleveland as parallel contributors, not "earlier versions". Suggest: "often associated with Russell Ackoff's 1989 paper, alongside earlier work by Zeleny and Cleveland" |
| 32 | Ackoff's definitions: data are symbols recorded by observation; information answers who/what/where/when/how many; knowledge is know-how; wisdom is judgement about what's worth doing | Frické 2009 (Zenodo), ISKO §2 | S | Frické 2009 §2 quotes Ackoff: data are symbols, "products of observation"; information answers who/what/where/when/how many; knowledge is know-how. ISKO: wisdom "adds value, which requires … judgement". Ackoff's version also has a fifth level, "understanding", which the article (like most users) leaves out |
| 33 | Critics argue knowledge can't simply be built up from data (Frické, 2009) | Frické 2009 | S | Abstract: the hierarchy is "unsound and methodologically undesirable"; critique of inductivism |
| 34 | 2022 survey commissioned by Intoware: 74% of 1,030 respondents at UK industrial businesses relied on legacy systems and spreadsheets | The Manufacturer, 31 March 2022 | S | Fieldwork 28 February to 3 March 2022, run by Surveygoo; "legacy systems and spreadsheets to get tasks done". The article calls it "Intoware's independent survey" |
| 35 | Sheffield Forgemasters replaced paper job cards and spreadsheets with an MES; office paper and spreadsheet costs down 40%, planning efficiency up 20% | Made Smarter case study, 23 December 2021 | S | Figures as stated; no baseline or method given. The article's "reported" is appropriate |
| 36 | Critical data guidance: identify what matters most first, by what people ask for and what other work depends on; give each a named owner | GDS, *Identifying and recording critical data assets* (updated 16 April 2026) | S | "How to get started": demand, and how much **other organisations** rely on the data; a "named responsible owner". Wording is a fair paraphrase |
| 37 | In a factory, that means one value stream | none | (editorial) | Our application, unsourced but reasonable |
| 38 | Public guidance supports recording: name, source and storage, purpose and format, owner, update frequency, quality, users and retention | GDS, *Recording metadata to describe critical data assets* (16 April 2026) | P | **Mostly not supported.** The page's fields are creator, dateCreated, title, alternativeTitle, description, identifier, mediaType, expires/supersededBy, temporalCoverage, conformsTo, accessRights, securityClassification and licence. Supported: name (title), what it is (description), where it comes from (creator), format (mediaType). **Not on the page:** storage location, purpose, owner, update frequency, quality or known issues, users, retention |
| 39 | ICO toolkit: data flow map from an information audit, with a named person responsible in each area; written for personal data | ICO records management toolkit | P | "Produce an information flow map based on the information audit" is an expectation. The named staff member in each area is only listed under "Options to consider", and the role is to carry out audits. The page covers personal information and is marked as under review (Data (Use and Access) Act) |
| 40 | ISO 19650 UK guidance turns the order round: the receiver says why and what it needs before it's produced; ask only for what you need, to avoid waste | UK BIM Framework, Guidance Part D, Edition 2 (February 2021) | S | §1.2.2 p.11 ("we have to turn this workflow around"); §1.2.3.2 p.14 ("Information receivers (specifiers) should only ask for the information they need") |
| 41 | OIR feed AIR and PIR, which feed the detailed requirements in each contract (EIR) | Same | S | §§1.3 to 1.7; AIR and PIR "derived from OIR"; EIR. Edition 2 is still the version at the cited URL |
| 42 | acatech argues companies should stop collecting data only for a specific analysis and keep an up-to-date picture of the whole company | acatech, *Industrie 4.0 Maturity Index, Update 2020* | S | §3.1.3 Stage three: Visibility: "Rather than only collecting data to enable a specific analysis…" |
| 43 | Network Rail Wales and Western: 306 interventions at 36 sets of points; delay minutes down 53% in 2025/26; £3.6m avoided cost; route-wide points delay still rose | NR W&W *Performance Improvement Plan Report*, 20 April 2026 | S | FI.02 Points Resilience case study: 53% (27,980 fewer minutes), "£3.6 million cost avoidance"; route-wide points delay rose because of extreme temperatures and points out of scope. Operator-authored |
| 44 | Data ownership model "defines three roles": owner, steward, custodian | GDS, *Data ownership model* (16 April 2026) | P | The three role descriptions are accurate. Owner: approves changes, sets definitions, restricts access, makes sure a retention schedule exists. Steward: handles queries, fixes quality, keeps the glossary up to date. Custodian: captures, stores and disposes of data to the owner's requirements. But the model defines **more** roles (CDO, SIRO, process owners, enterprise data owners and others). Say "defines three core roles" |
| 45 | The model comes with a responsibility matrix and a checklist | Same | S | Appendix B (RACI); §9 "A checklist for your organisation" |
| 46 | Government policy requires each data asset to have a named owner, with its description reviewed every year | GDS, *Data asset management policy* (27 May 2026) | S | "All identified data assets must have a named data owner"; metadata "must be maintained and reviewed on an annual basis" |
| 47 | ICO: monitoring needs a lawful basis, workers must be told, choose the least intrusive option | ICO, *Data protection and monitoring workers* | S | All three stated. Reuse for performance management needs a new lawful basis. Page marked under review |
| 48 | Framework defines quality as fitness for purpose with six dimensions | Government Data Quality Framework | S | "Data quality dimensions": completeness, uniqueness, consistency, timeliness, validity, accuracy |
| 49 | Valid data can still be wrong (government explainer) | GOV.UK news, *Meet the data quality dimensions*, 24 June 2021 | S | "we should not take for granted that valid values are always accurate" |
| 50 | Edinburgh children's hospital: 2012 spreadsheet listed 4 air changes an hour for critical care though its guidance tab required 10; internal audit judged it most likely a copying error | NHS Lothian internal audit report, July 2020 | S | Para 146 (p.17): the guidance note tab "correctly states" 10; "human error in copying across" generic criteria. Also paras 43 to 46 |
| 51 | Quote: "Always fix problems in data quality as close to the source as possible." | DQF guidance | S | Verbatim, under "Data quality root cause analysis", step 4 |
| 52 | Framework: required quality depends on purpose, prioritise the most critical data, perfect quality may not be achievable | DQF | S | All three statements present |
| 53 | HSE warns important knowledge at most sites goes unrecorded and can be lost "when people retire or the organisation changes" | HSE CHIS7 | P | p.4: "At most sites there will be important knowledge … that are not recorded and which can be lost…", in the context of organisational change at major-hazard sites. Retirement isn't mentioned |
| 54 | Writing it down only gets you so far; the CDM "works better"; it needs a skilled interviewer but captures judgement procedures leave out | AHRQ, *Critical Decision Method* | P | Supported: non-routine incidents, the expert's account of what they "thought and perceived", heavy training needed. Not in the source: any comparison with written accounts (so "works better" is unsourced), and "judgement that procedures leave out" |
| 55 | 2012 audit: only 16 of 28 surveyed NASA project managers used the lessons database | NASA OIG IG-12-012, 6 March 2012 | S | Results: "only 16 of the 28 (57 percent) project managers indicated that they used LLIS" |
| 56 | IBM modern data stack: storage, ingestion, transformation, analytics, monitoring | IBM Think | S | "Data storage", "Data ingestion", "Data transformation", "BI and analytics", "Data observability". IBM lists governance as an optional extra. Vendor-authored |
| 57 | NIST: OT is time-critical, outages planned days or weeks ahead, human safety first, equipment lasts 10 to 15 years vs 3 to 5 for IT | NIST SP 800-82r3 | S | §2 comparison of OT and IT, and Table (component lifetime: "three to five years" vs "10 to 15 years and sometimes longer") |
| 58 | ISA-95 levels from sensors and PLCs, through MES and SCADA, to ERP | ISA-95 page | S | Levels 0 to 4 described, naming PLCs/DCS (L2), MES and SCADA (L3), ERP (L4) |
| 59 | NIST advises connections only between adjacent levels; office systems not straight to controllers | NIST SP 800-82r3 | S | Firewall recommendations: "only permit connections between adjacent levels"; Level 4 not to talk to Levels 2, 1 or 0 |
| 60 | NCSC: every connection starts with a business case naming benefit, risk and a senior risk owner | NCSC, *Secure connectivity principles for OT* (Crown copyright 2026) | S | Principle 1: business case covering requirement, benefit, risk tolerance and "Senior Accountability: who is the senior risk owner" |
| 61 | NCSC: obsolete devices shouldn't connect directly to outside networks | Same | S | "unsuitable for direct external connectivity beyond the OT network boundary" |
| 62 | NCSC: copy data out through a one-way link; favour open standards such as OPC UA and MQTT over encrypted connections | Same | S | "replicate the OT historian … via a unidirectional, secure transfer mechanism"; "OPC UA over TLS, MQTT over TLS" |
| 63 | EU Data Act access right only for users established in the EU, per Commission guidance | Commission Data Act FAQ v1.4, 22 January 2026 | S | Q15: "a user must be established in the EU" (Art. 1(3)(b)). The FAQ says its views are not authoritative. A UK firm with an EU establishment could still rely on it; "doesn't help a UK factory" is fair for a UK-only site |
| 64 | DUA Act 2025 gives ministers powers to create such rights; no regulations giving factory users a right to machine data | legislation.gov.uk, Part 1 | S | Part 1 "Access to customer data and business data" confers powers on the Secretary of State and the Treasury (ss.1 to 4). A search found no Part 1 scheme regulations covering machine data; the planned schemes are in finance, energy and fuel prices |
| 65 | Made Smarter Adoption 2022/23 to 2024/25: 559 grant projects, £7.82m grant, £16.61m matched | Made Smarter Adoption KPI statistics | S | Table 3 (559), Table 4a (£7.82m), Table 4b "Grant Expenditure Matched" (£16.61m). Five regions only (NW, WM, Y&H, NE, EM) |
| 66 | "A first project usually costs tens of thousands of pounds" | Same (derived) | P | The mean (£43,700) supports "tens of thousands" as an average for grant-supported SME projects across all digital technologies. It doesn't show what a project "usually" costs (no median or distribution), or what data work costs. Suggest "averaged about £43,700" wording only |
| 67 | Made Smarter is the government programme for SME manufacturers in England; advice and match-funded grants up to £20,000 in several regions; terms vary | madesmarter.uk/adoption | S | SMEs with manufacturing premises in England; "up to £20K" listed for EM, London, NW, WM, SE (hardware only), SW, Y&H. Regional offers differ. No closure notice |
| 68 | "2023 University of Cambridge survey of 155 participants": 97% of adopters reported benefits; planning 76%, data 74%, costs 69% | Cambridge IfM, *Made Smarter Adoption Research Project Summary Report*, February 2023 | P | Figures correct (Key findings). The survey ran **9 September to 18 October 2022**; the report is 2023. Say "a University of Cambridge survey published in 2023". "No comparison group" is correct by design (beneficiaries only) |
| 69 | Data engineer advertised median £70,000 (IT Jobs Watch, all sectors) | IT Jobs Watch | S | "6 months to 24 Nov 2026" median £70,000 for UK permanent adverts (same as a year earlier). The page doesn't break down by sector; "all sectors" means not sector-filtered, which is accurate |
| 70 | About £79,750 with 15% employer NI, before pension | HMRC rates 2026 to 2027 | S | 15% above a £5,000 secondary threshold; see Derived figures |
| 71 | Data apprenticeships funded up to £13,000 (L3) and £15,000 (L4); non-levy employers pay 5%, nothing for 16 to 24 | Apprenticeship funding guide from August 2026 | P | Co-investment rules supported (5% for age 25+; waiver for 16 to 24 for starts from 1 August 2026). The £13,000 and £15,000 caps are **not in the linked guide**; they're on the Find apprenticeship training pages (Data technician L3, course 576, £13,000; Data analyst L4, course 80, £15,000). Add those links |
| 72 | KTPs pair a business with a university; grant covers 67% for SMEs, 50% for large firms | UKRI KTP grant rates | P | 50% large firms correct. SMEs get 67% only on full-economic-cost projects (60% on non-FEC). The page says "knowledge base", which includes universities but isn't limited to them |
| 73 | AMRC connected a legacy machine with about £400 of hobby-grade hardware; the figure leaves out installation, integration, security and support; sampling too slow for condition insight | AMRC white paper, *Digitalisation of Legacy Machine Tools* (c.2018) | P | £400 hobby/prototyping hardware (§3, Table 1) and the too-low sampling frequency (§2) are supported. The paper doesn't say the figure leaves out installation, integration, security and support; that's our inference (it does flag a lack of integration skills as a barrier). The paper is about eight years old; consider dating it |
| 74 | AQuA Book: checks in proportion to effect, size and complexity | HM Government, *The AQuA Book* (2025 edition, 30 July 2025) | S | Chapter 3: "proportionate to the potential effect it will have and the size and complexity of the analysis" |

## Unsourced factual sentences

These are factual-sounding sentences with no link in the paragraph, or opinion stated as fact. Clearly labelled editorial passages ("ours", "our calculation", the "we'd add" passage) are not listed.

- **"Some of these tools deliver."** (opening). Harmless, but unsourced.
- **"The tools that have spread are mostly in the office."** This interprets the ONS figures: image and text generation isn't necessarily office work. Soften to "mostly generative tools".
- **"Understanding your data is what lets you trust a tool enough to give it a bigger job."** (end of the low-risk section). An opinion stated as fact. The brief itself says no source shows that distrust of data is why tools stay advisory. Label it ("in our view") or soften it.
- **"Distrust of the data is part of the reason."** The cited sources show data quality is a frequently named barrier, not that it causes the advisory or low-risk pattern. It's hedged, but it's still a causal claim.
- **"The warning signs are familiar to anyone who has worked in a plant."** This is experience-based (the editor note says it comes from the issue notes). Acceptable as voice, but it isn't evidenced.
- **"No guidance prescribes these, but without them you can't use the data later."** The second half overstates. Data without units or sample rate is harder to use, not unusable.
- **"A picture … tends to settle arguments that a spreadsheet of systems never will. It usually shows the first thing to fix as well."** Experience stated as general fact (from Nikita's note). Label it as experience.
- **"Construction and infrastructure have a well-tested method"**: "well-tested" is unsourced.
- **"Some of the best opportunities turn up this way, because nobody thought to ask the question."** Unsourced.
- **"In a small firm one person can hold two roles."** Not checked against the model; it reads as our advice. Fine if read that way.
- **"A workable rhythm is a short weekly look…"** The rendered text doesn't say "our suggestion" (only the hidden editor note does), although the next sentence implies it. Consider "We suggest a short weekly look…".
- **"Correcting numbers downstream … hides the cause and lets the problem come back."** Reasonable, but unsourced. The DQF guidance root-cause section could carry it.
- **"Asking people to write it down only gets you so far. The Critical Decision Method works better"**: the comparison isn't in the AHRQ source (row 54).
- **"For a first process, a historian, a database and a dashboard are often enough."** Opinion stated as fact.
- **"A first project usually costs tens of thousands of pounds."** See row 66.
- **"The best UK benchmark"**: a judgement, fine as voice.
- **"published case studies, which are mostly successes"**: unsourced, though uncontroversial.
- **"Training someone who already knows the plant is often the better route."** Opinion stated as fact.
- **"a focused fix improves the thing it targets, and only that"** (Network Rail). Interpretation: the report attributes the route-wide rise to extreme temperatures and out-of-scope points.

## Derived figures

**ONS 20% (BICS Wave 165).** Checked against the cited workbook (`bicswave1652final.xlsx`), sheet "AI Current Usage TS (WTD)", row "21 September 2026 to 4 October 2026 | Wave 165 | Manufacturing". Not using AI = 0.761; Not sure = 0.037. 100 − 76.1 − 3.7 = **20.2%**: correct. Weighted by count; base is businesses not permanently stopped trading. Other values confirmed: visual content 12.2%, text generation 10.3%, data processing using ML 4.0%, image processing using ML 2.3%, robotics 2.3%, other 2.3%, autonomous vehicles 1.1%. For context, Wave 159 (15 to 28 June 2026) gives 100 − 73.1 − 5.3 = 21.6%, so the figure is broadly flat.

**Newer BICS waves.** The ONS dataset page shows Wave 165 released 8 October 2026. Waves 166 (22 October), 167 (5 November) and 168 (19 November 2026) have since been published, and the next release is due 3 December 2026. I downloaded all three: **none contains AI sheets** (166 and 168 are core trading modules; 167 is a trade/export module). The AI usage question has run every sixth wave (141, 147, 153, 159, 165), so the next AI data is probably Wave 171, around January 2027. That's an inference from the pattern, not an ONS statement. The article's figure is the latest available.

**Made Smarter mean.** (£7.82m + £16.61m) ÷ 559 = **£43,703**, so "about £43,700" is correct. Mean grant is about £13,990; mean matched spend is about £29,710. The assumption that Table 4b ("Grant Expenditure Matched") is the firms' contribution is reasonable: the note under it says "a business must match the grant provided to a level of at least 1:1". The table doesn't say outright that the matched sum is all private money.

**Salary on-cost.** £70,000 + 15% × (£70,000 − £5,000 secondary threshold) = £70,000 + £9,750 = **£79,750**: correct for 2026 to 2027 (15%, £5,000 per year, category A). Not included, and fine to leave out: employer pension; Employment Allowance (up to £10,500 off the employer NI bill for eligible employers), which could cut the on-cost for a small firm; and the Apprenticeship Levy for large pay bills. The article says "before pension", which is accurate.

## Tools and resources

| Entry | Verdict | Notes |
|---|---|---|
| Data quality action plan and template | Mostly accurate | GDS, published 11 November 2025, updated 16 April 2026: a seven-step guide, an issues framework and an Excel DQAP template. Free. It covers identifying and prioritising issues; "tracking" is a fair reading of a template but isn't stated. Written for public-sector organisations |
| Data ownership model | Accurate | RACI (Appendix B) and checklist (§9). Free |
| Ofgem Data Best Practice templates (zip) | Accurate | Contains "Field Level Information" (xlsx/csv) plus triage, stakeholder and user-research templates. Free. The zip is dated 2021; the supporting guidance is from 2026 |
| diagrams.net | Accurate | Now branded draw.io at drawio.com; Apache 2.0 source, "free forever". Free and open source is correct |
| OpenRefine | Accurate | BSD-3-Clause, actively maintained |
| DuckDB | Accurate | MIT, actively maintained |
| Grafana | Accurate | AGPL-3.0 open source; Grafana Cloud (free and paid tiers) and Grafana Enterprise are paid options. The label is right |
| Node-RED and Eclipse Mosquitto | Accurate | Apache-2.0 and EPL-2.0/EDL-1.0 respectively; both maintained |
| Shoestring | Accurate | IfM Cambridge-led SME programme. Solutions include downtime, power and location (plus scrap, air quality, temperature). Software on GitHub is GPL-3.0, so "free and open source software" could be stated. The homepage mentions "first steps into commercialisation"; worth rechecking that the starter solutions stay free |
| PAS 1040:2019 | Accurate | BSI, first published August 2019; full text as a free PDF; "nine-point scale" of digital readiness confirmed |
| Made Smarter digital readiness review | Partly accurate | The linked page is a facilitator-led "Digital Transformation Workshop" giving a roadmap and a "digital readiness level". It doesn't say "SME" or whether it's funded. "Funded in some regions; check yours" is plausible but not confirmed on that page |
| NCSC definitive view of OT architecture | Accurate | *Creating and maintaining a definitive view of your OT architecture*, v1.0, reviewed 18 March 2024; free to read |
| OpenLearn: Using data to aid organisational change | Accurate | About 10 hours, Level 2, free. "For managers" is a fair description, though the page doesn't name an audience |

No paid product is mislabelled as free.

## Further reading

| Entry | Resolves? | Publisher and year |
|---|---|---|
| Data & System Integration for manufacturers | Yes (PDF) | Made Smarter "Technical Guide". The document carries no date; file metadata shows it was created 22 June 2026, so 2026 is plausible but unconfirmed |
| AI Adoption in Manufacturing | Yes (PDF) | Made Smarter, *A Practical Toolkit*. Undated in the text; created 28 April 2026 |
| The Government Data Quality Framework | Yes | Government Data Quality Hub, 3 December 2020. Correct |
| Data Best Practice Supporting Information | Yes (PDF) | Ofgem, publication date 1 April 2026. Correct |
| The Root Causes of Failure for Artificial Intelligence Projects | Yes (HTML summary; the HTML page loads fine) | RAND, 13 August 2024. Correct |
| Secure connectivity principles for operational technology | Yes (PDF) | NCSC, Crown copyright 2026. Correct |
| Demystifying Digitalisation | Yes (PDF) | Make UK, ©2023, in partnership with AWS. Correct |

## Coverage: costs, limitations, when not to bother

All three are covered, in "What it costs, and when not to bother":

- **Costs:** the Made Smarter mean, salary on-cost, apprenticeship and KTP funding, and the AMRC warning about cheap hardware.
- **Limitations:** caveats on self-reported benefits, vendor surveys, non-representative samples, Network Rail's route-wide rise, and the DIKW critique.
- **When not to bother:** a four-point checklist plus a "spreadsheet is fine while…" test.

Two gaps worth considering: there are no figures for ongoing running costs (software licences, hosting, support), and the staff time needed for the four-week plan isn't estimated.

## Gist

"Data foundations means knowing what data you have, where it comes from, who owns it and whether you can trust it" matches the body's definition. "Understand your data landscape before you buy the tool, and build towards one measurable goal" matches the body's conclusion and the first-month plan, so the verdict is consistent.

There are two problems with the middle sentence:

- **"AI and digital twin projects stall"**: the body's evidence is entirely about AI. Nothing in the body is about digital twin projects stalling (the Make UK digital twin figure, claim 5, isn't used). Drop "and digital twin" or add evidence.
- **"alongside cost and skills"**: the body puts leadership and problem choice first (RAND 84%) and business-case clarity first among non-adopters (DSIT 62%/61%). Cost and skills are supported (Make UK, Deloitte), but leaving out leadership and use-case clarity misstates the body's ranking. Suggest "alongside leadership, cost and skills".

## Excluded material (point 7)

- No mention of Harrison Spinks (searched the article text).
- The Made Smarter Adoption impact evaluation's results are not discussed. The Made Smarter material used is the KPI statistics (outputs) and the 2023 Cambridge research-project survey (self-reported benefits), which the brief approved as claim 54. None of the dropped figures (+16.3% turnover, +12.5% jobs, GVA per worker) appears.
- None of the brief's "statistics we won't use" appears. The 74% spreadsheet figure is correctly attributed to the 2022 Intoware survey and described as covering legacy systems and spreadsheets.

## Passages that read as AI-written

- Staged contrasts and openers: "Some of these tools deliver. Most…, though."; "So 'fix all the data first' is the wrong conclusion."; "The answer sits between the two:"; "Data isn't the whole story, though."; "The fair reading:"; "'Data governance' sounds like a committee. In practice…"; "The two views are easier to reconcile than they look."
- One-line closers: "The rest can wait."; "It won't remove the other barriers on its own."; "a focused fix improves the thing it targets, and only that"; "which is a better place to start a vendor conversation than a demo."
- Punchy section-opener formula, repeated: "Spreadsheets carry a lot of weight."; "Watch for data you can't get at."; "Be wary of cheap connection prices."; "Then there are people."; "Don't chase perfection either."; "Capturing knowledge is only half the job". Each works on its own; together they become a tic.
- Forced triad in the opening: "an AI tool…, a digital twin…, a platform…". Also "context, an owner and a known quality".
- Inflated: "settle arguments that a spreadsheet of systems never will"; "Safety-critical work shows the same pattern more sharply".

## Spelling

There are no American spellings in the article's own prose. "Organization" appears only in the proper name "ISKO Encyclopedia of Knowledge Organization". Programme, organisation, visualisation, judgement and favour are all British forms.

## Diagrams

- `data-foundations-data-map.svg` and `data-foundations-hierarchy.svg` are both clearly labelled as invented examples (the map's footnote says it's "not a real plant").
- `data-foundations-layers.svg` and `data-foundations-both-ends.svg` contain only generic categories and no factual claims, so they need no "invented" label.
- No diagram presents a figure as real.

## Resolved (24 November 2026)

Each flag above, and what changed in the article. Claude made the fixes. The linter, build and link check were clean afterwards.

- **Preprint caveat (row 29), not supported:** fixed. The article now cites the published paper (*Scientific Reports* 14:31150, 2024, https://doi.org/10.1038/s41598-024-82501-9) and the caveat is gone.
- **"Larger manufacturers" (row 18b), not supported:** fixed. Now reads "Some firms do use AI in operations", and Deloitte's survey is described as covering all company sizes.
- **Metadata list (row 38):** fixed. The article now credits the GOV.UK page only with the fields it lists (name, description, creator, format, access) and the data asset policy with the named owner. The remaining fields are presented as our own suggestion.
- **RAND 84% (row 5):** fixed. The base is now the 50 industry interviewees, and RAND's caveat about its mostly non-managerial sample has been added.
- **Glosses (rows 19, 27, 53, 54, 73):** removed or labelled. Closed-loop now uses Deloitte's own term, with no definition added. "So a person stays accountable" is cut. "When people retire" is cut. The comparison saying the Critical Decision Method "works better" is cut. The AMRC paper is dated "around 2018", and the point that a hardware price leaves out installation and support is now a general remark, no longer attributed to the paper.
- **Dates (rows 2 and 68):** fixed. ONS now reads "late September and early October 2026". The Cambridge survey is "run in 2022 and published in 2023".
- **Apprenticeship caps (row 71):** fixed. The figures now link to the Level 3 and Level 4 course pages.
- **KTP (row 72):** fixed. Now reads "up to 67%", and "university" is widened to "university or other research organisation".
- **Overstated wording:** both fixed. "Many firms collect data without using it" now reads "Firms that analyse their data don't always act on it". "A first project usually costs" now reads "can cost".
- **Data ownership model (row 44):** fixed, now "three core roles".
- **ICO named person (row 39):** removed.
- **DIKW attribution (row 31):** fixed, with the checker's suggested wording ("often associated with").
- **"On their own data" (row 3):** reworded to "machine learning to process data".
- **Precisely sample (row 25):** "mostly in the US" added.
- **Gist:** it now lists leadership, unclear goals, cost and skills, and no longer mentions digital twin projects.
- **AI-written passages:** reworded "Data isn't the whole story", "The fair reading", "The answer sits between the two", "The rest can wait", "Spreadsheets carry a lot of weight", "Then there are people", the Network Rail closer, and "Safety-critical work shows the same pattern more sharply". Left for Nikita's edit: the opening list of three vendor pitches, and "settle arguments that a spreadsheet of systems never will", which is in a passage marked for his review.

**Checked separately after this report:** the Grieves sentence on noise (brief claim 65) was added after the checker started. Claude opened it at https://www.mdpi.com/2673-9585/4/2/7, section 4.1 "Data", on 24 November 2026: supported.

## Follow-up check, 25 November 2026 (changes since af87726)

Checker: independent subagent. Scope: `git diff af87726 HEAD` for `src/content/articles/data-foundations.mdx` and `src/content/articles/images/` (only `data-foundations-data-map.svg` changed). Settled rows above were not reopened unless their wording or link changed. The MDPI page blocks WebFetch, so the Grieves text was read in the built-in browser. The Ofgem templates zip was downloaded from ofgem.gov.uk and its contents listed (not extracted).

### Summary

38 claim rows checked: **24 supported, 11 partly supported, 3 not supported, 0 source unreachable.** Most important first:

1. **"The tools that have been adopted are not in the field or on the shop floor" (row 3): not supported.** ONS doesn't classify AI use by location. Its own figures include robotics (2.3%) and machine learning to process data (4.0%), and Make UK's landing page gives 11% of members using AI in production and 6% in quality control. This goes further than the "mostly in the office" line the first check already flagged.
2. **"(likely supporting internal reports and presentations)" (row 5): not supported.** ONS doesn't ask what the images and text are for. It is a guess inside a factual sentence.
3. **"locked behind paywalls" (row 35): no source.** The sentence lost its support when the EU Data Act and DUA Act material next to it was cut.
4. **Opening sentence (row 1): partly supported.** Make UK covers AI only, so "or modern digital tools" isn't evidenced, and "failing to scale" is our gloss on "not widely embedded".
5. **Labels that were removed:** the ISO 19650 table is no longer marked as our own analogy, which the brief requires (row 29). The weekly and monthly rhythm is no longer marked as our suggestion (row 31). The MIT Technology Review survey no longer says Microsoft commissioned it (row 14).
6. **£79,750 stat (components):** it is credited to IT Jobs Watch alone, but it is our calculation using HMRC's NI rate. IT Jobs Watch shows £70,000.
7. **Gist:** "digital projects" stretches evidence that covers AI only, and leadership, which the body ranks first, has been dropped again.
8. **Smaller points:** "our sum" for the 20% (it's a subtraction); "digital projects fail" where RAND covers AI only; "successfully use AI"; "simple symbols" in the DIKW definitions; "do not add any value"; the hedged causal claim about distrust; the Cambridge landing page dated 2024; the Ofgem "who uses each dataset and why" (the template has no "why"); PAS 1040 now behind a registration form.

Both pull quotes are verbatim. The bar chart figures match Deloitte. The redrawn data map is clearly labelled as invented. There are no American spellings in the article's prose.

### Claims

Verdict key as above (S, P, N, U).

| # | Sentence (short paraphrase) | Source | Verdict | Where / notes |
|---|---|---|---|---|
| 1 | Statistics show most UK manufacturers who have tried AI "or modern digital tools" are still experimenting or failing to scale | Make UK 2026 (landing page, PDF linked) | P | The AI part is supported: of the 82% who have adopted, 43% are running limited experiments and 37% have moderate use or small pilots, against 2% widely embedded (PDF p.3, Chart 1 p.7). An AI survey doesn't cover "modern digital tools". "Failing to scale" is a gloss: the source says AI isn't widely embedded, not that it failed |
| 2 | Only 2% of members had AI widely embedded and 43% were running limited experiments | Same | S | The landing page (8 June 2026) gives the 2%. The 43% is in the linked PDF, Chart 1. The earlier caveat "the report doesn't give its sample size" (brief claim 3) was dropped |
| 3 | Adopted tools are "not in the field or on the shop floor, but are mostly in the offices" | ONS BICS wave 165 | N | ONS reports technology types, not where they are used. Robotics (2.3%) and ML data processing (4.0%) are plausibly shop-floor uses, and Make UK's landing page gives 11% production and 6% quality-control use. Suggest "mostly generative tools such as image and text creation" |
| 4 | About 20% of UK manufacturers said they used some form of AI, mostly to create images and text | ONS wave 165 | S | Same figures as before (see Derived figures above). "Said they used" is accurate for a survey |
| 5 | "(likely supporting internal reports and presentations)" | ONS wave 165 | N | Not in the data: ONS doesn't ask about purpose. Cut it, or say plainly that it is our guess |
| 6 | Only 4.0% used machine learning models to process data; 2.3% used AI in robotics | ONS wave 165 | S | Categories "Data processing using machine learning" and robotics, as before |
| 7 | "the 20% is our sum of the published figures" (also the StatRow label "our sum") | ONS wave 165 | P | The figure is 100 − 76.1 (not using) − 3.7 (not sure). Firms can tick several categories, so adding up the usage categories gives more than 20%. Say "our calculation" |
| 8 | "Bad data is a real reason digital projects fail" | RAND RR-A2680-1 (landing page) | P | RAND studies AI projects only. Read "AI projects" in af87726 |
| 9 | RAND passage as reworded ("However, RAND notes…", "Data issues came second") | Same | S | The landing page summary gives 65 interviewees, leadership first and data second. The detail is in the PDF, as in rows 4 to 8 above |
| 10 | 2024 Make UK survey of 151 manufacturers, barrier percentages | Make UK, *Future Factories Powered by AI* (landing page, 25 November 2024) | S | The figures are in the linked PDF (Chart 6), not on the landing page. "Run with Autodesk" was dropped, though the landing page names Autodesk as partner |
| 11 | Non-adopters: understanding 62%, business case 61%, better data 41% (government's 2026 AI adoption research) | GOV.UK landing page "AI adoption survey 2026" (29 October 2026) | S | Offers the same PDF (`artificial-intelligence-adoption-research-report-2026.pdf`, 116 pp), now titled "AI adoption survey report 2026", plus data tables. Figures as in row 10 above |
| 12 | Made Smarter's toolkit tells manufacturers "to get started and not to wait for perfect data" | Made Smarter landing page (22 April 2026), PDF | S | PDF p.10 says the opportunity "is not to wait for perfect data, but to start using what they already have". This wording is in the PDF, not on the landing page |
| 13 | NAO: programmes fail to deal with data at the start | NAO landing page (21 July 2021) | S | Offers the same report PDF and a summary |
| 14 | 2024 survey of 300 manufacturing executives "by MIT Technology Review Insights" (no sponsor named) | Microsoft blog | P | The figures are supported, as before. The blog says "Microsoft commissioned a research report in collaboration with MIT Technology Review Insights". The earlier "paid for by Microsoft" has gone, though the brief marks this claim as vendor-sponsored. The survey is also global, which the article doesn't say |
| 15 | "some firms do manage to successfully use AI in operations" | Deloitte, *AI in Manufacturing 2026* | P | Deloitte reports adoption by function (quality 62%, production 57%), not success. The same page says only about one in five use cases has been scaled. Drop "successfully" |
| 16 | HSE study: largest single category was "admin: drafting health and safety documents (25.1%)" | Chambers et al., Hazards 35 | S | Figure 4 text: document generation "dominates the low-level landscape" at 25.1%. The Discussion links it to "knowledge management and administrative efficiency", so "admin" is fair. (At the high level, "Other" is the largest and H&S management is 25.9%.) |
| 17 | Predictive maintenance "just 3.6%"; respondents kept a real person in the loop to approve safety-critical outputs | Same | S | 3.6% appears in both Figure 3 and Figure 4. Human approval is listed among respondents' controls ("mandatory human approval for safety-critical outputs") |
| 18 | Callout: the sample isn't statistically representative, so treat it as a rough indicator | Same | S | Discussion, as row 22 above |
| 19 | "So adoption seems to be limited to low-risk use cases, and distrust of the data is part of the reason why" | HSE, MIT TR, Drexel (following sentences) | P | The first half is hedged. The second half is stated as fact, but the sources show data quality is a frequent barrier, not that it causes the low-risk pattern (the brief says the same). Suggest "and poor or distrusted data is one of the barriers people name" |
| 20 | Vendor-sponsored survey of 565 data professionals, all sectors, mostly US, 67% don't completely trust data | Drexel LeBow news page (16 September 2024) | S | Supported by the PDF (row 25 above). The new landing page confirms 565 respondents "across various sectors" and links the PDF, but doesn't give the 67% or mention trust. "Only 9% in manufacturing" was dropped; "across all sectors" still meets the brief |
| 21 | Deloitte fifth at 30%; HSE risk-assessment statement; Scientific Reports five-fold result (reworded framing only) | As rows 26 to 28 above | S | The claims themselves are worded as before |
| 22 | DQF "describes a data lifecycle with six stages" | DQF | S | Same list as before |
| 23 | "Data are simple symbols recorded by observation, information is…, knowledge is the know-how…, wisdom is judgement…" | ISKO | P | The definitions are Ackoff's, quoted in ISKO ("Data are symbols that represent properties of objects…"). "Simple" isn't in the source. With the attribution to Ackoff and the Frické critique cut, the definitions now read as settled fact. Not wrong, but less candid than af87726 |
| 24 | Grieves: data always has context; a string of numbers without it is noise, not data | Grieves 2024, MDPI §4.1 | S | §4.1 "Data": "Data always have context", then the noise passage (see Components) |
| 25 | "Readings with no units, time or source, which nobody can use, do not add any value to the business" | Grieves (same paragraph) | P | Grieves says such inputs are noise until put in context, and notes that we may still collect and store them. "No value to the business" is our stronger claim. The commas also make the sentence say that no such reading can be used |
| 26 | Critical data guidance; metadata guidance; data asset policy owner ("also adds") | GDS pages | S | The claims are as before. The list that follows ("For industrial data it is also useful to record") is advice, but the af87726 signpost "No guidance prescribes that second list" has gone, so a reader could take the list as part of the guidance |
| 27 | "flowcharting tools like draw.io (free) or Visio (paid)" | drawio.com; microsoft.com/en-gb Visio | S | Visio Plan 1 is £3.80 and Plan 2 £11.50 per user per month (ex VAT). The page also says a basic Visio web app is included with Microsoft 365 commercial plans, so "paid" is broadly right |
| 28 | ISO 19650 UK guidance: the receiver says why and what it needs first, and asks only for what it needs. "This top-down approach can help identify gaps… and reduce unnecessary data capture" | UK BIM Framework Part D | S | As rows 40 and 41 above. Reducing capture matches §1.2.3.2; identifying gaps is our reasonable reading |
| 29 | ISO 19650 table "What it might mean for industry", introduced with "the idea is very transferable" | Same | P | The terms are right. The af87726 label saying the translation "is our own" has gone, and the brief (claim 28) says the translation "must be labelled as one". "Might" hedges but doesn't say whose translation it is |
| 30 | Data ownership model is "a good starting point… defines three core roles"; "one person can hold multiple roles" | GDS data ownership model | S | Roles as row 44 above. "Multiple roles" is our advice, which is fine |
| 31 | "a workable rhythm is a short weekly look… an annual review of the data map", followed by the policy sentence | GDS data asset management policy | P | The policy supports only an annual review of each asset's description. The weekly and monthly parts are ours, and the af87726 line "Only the yearly review has a public precedent" has gone. With the two sentences side by side, the policy now seems to back the whole rhythm. Say "We suggest…" |
| 32 | "Data quality isn't a single score, but a measure of fitness for purpose across six dimensions" | DQF | S | Same substance as before |
| 33 | Don't chase perfection; a morning dashboard against a figure "used to release product to a customer" | DQF | S | Framework statements as row 52 above; the example is ours |
| 34 | NIST, ISA-95 and NCSC passages (only the links changed) | NIST SP 800-82r3; NCSC | S | Wording as before; see Links for the landing pages |
| 35 | "Some machines keep their data in the supplier's own software or format, locked behind paywalls" | none | N | No source in the paragraph. The first half was already in af87726 as a warning sign. "Locked behind paywalls" is new and unsupported. Cite something, or present it as experience ("in our experience, some suppliers charge for access") |
| 36 | Made Smarter KPI: 559 projects, £7.82m grant, £16.61m matched; "(our estimated calculation)" | Made Smarter news page (6 June 2025) | S | The landing page itself shows Table 3 (559), Table 4a (£7.82m) and Table 4b (£16.61m) and links the PDF. No newer edition is mentioned. "Our estimated calculation" is odd: the mean is a straight calculation, not an estimate |
| 37 | Cambridge survey of 155 participants, "run in 2022 and published in 2023"; 97%, 76%, 74%, 69% | GOV.UK "Made Smarter Adoption research project" | P | The figures are supported (row 68 above; same PDF, `65e06d14…/made-smarter-adoption-report.pdf`). But the landing page says "Published 4 March 2024" by the Department for Business and Trade and doesn't name Cambridge, so a reader who follows the link sees 2024 against our 2023. Suggest "published in 2023 (on GOV.UK in 2024)" |
| 38 | Data engineer median £70,000 (IT Jobs Watch) | IT Jobs Watch | S | "6 months to 25 Nov 2026": £70,000. Same period in 2025: £70,000 |

### New sentences with no source, or opinion stated as fact

- **"If you search online for 'AI' or 'Digital Transformation', the first results that come up are from software or service providers. Most pages you come across bring another sales pitch"**: no source, and results vary by user and search engine. Soften to "many of the first results".
- **"Doing this iteratively will lead to much stronger data foundations over time"**: a promise stated as fact.
- **"The warning signs are familiar to almost any organisation"**: widened from "anyone who has worked in a plant", with no evidence.
- **"Understanding your underlying data is the first step that will enable you to trust a tool enough to give it a bigger job."**: the first check flagged this as opinion stated as fact, and it is now stronger. The af87726 caveat "though it won't remove the other barriers" was cut, and the brief says data "isn't the only gate".
- **"A visual approach will work for most stakeholders."**: experience stated as a general fact.
- **"Some of the best low-hanging-fruit opportunities turn up this way as they require little change or transformation."**: no source.
- These are clearly judgement and are fine as written: "Endlessly optimising… may be an endless task", "So it is critical to consider the full lifecycle", "in the ideal scenario, the two views can be reconciled", "Asking this question early can help identify rogue data".

**Caveats removed since af87726 (not errors, but each removal should be deliberate):** Make UK's missing sample size; Autodesk as survey partner; Microsoft as commissioner of the MIT TR survey; 9% manufacturing in the Drexel sample; the Frické critique of DIKW; "though it won't remove the other barriers"; "No guidance prescribes that second list"; the ISO translation and the rhythm marked as our own.

### Components

| Component | Content | Verdict | Notes |
|---|---|---|---|
| StatRow 1 (ONS, "wave 165, autumn 2026") | 20% (our sum); 4.0% ML to process data; 2.3% AI in robotics | S, one wording fix | Values match the workbook. "Our sum" should be "our calculation" (row 7). "Autumn 2026" matches fieldwork from 21 September to 4 October |
| Callout (HSE) | Sample not representative | S | Discussion section |
| BarChart (Deloitte) | Costs 43, expertise 35, resistance 35, regulatory 34, data 30 (highlighted) | S | Values and order match the page. Deloitte's labels are "high implementation costs", "lack of technical expertise", "resistance to change", "regulatory/compliance concerns" and "data availability or quality issues", and the chart's shorter versions are faithful. The title is ours (Deloitte gives the list in text, with no chart), and it is fair because these are the challenges the page lists |
| PullQuote (Grieves) | "There is no such thing as data without context. This is simply noise." | S, verbatim | MDPI §4.1 "Data", two consecutive sentences, read in the browser on 25 November 2026. The cite drops the subtitle (full title *DIKW as a General and Digital Twin Action Framework: Data, Information, Knowledge, and Wisdom*, Knowledge, 2024), which is acceptable |
| PullQuote (DQF guidance) | "Always fix problems in data quality as close to the source as possible." | S, verbatim | Guidance page, under "4. Fix as close to source as possible" in the root cause analysis section |
| StatRow 2: £43,700 | Average Made Smarter project, grant plus match (our calculation) | S | Labelled as ours; the source page carries the inputs |
| StatRow 2: £20,000 | Maximum Made Smarter grant in several regions | S | "Up to £20K" is listed for EM, London, NW, WM, SE (hardware only) and SW, and "up to £20,000" for Y&H |
| StatRow 2: £79,750 | Median advertised data engineer salary plus employer NI; source "IT Jobs Watch" | P | IT Jobs Watch gives £70,000. £79,750 is our calculation using HMRC's 15% above £5,000. Add "(our calculation)" and credit HMRC rates too |
| StatRow 2: £15,000 | Maximum funding for "a Level 4 data apprenticeship"; source "Apprenticeship training" | S, label could be tighter | Course 80 is "Data analyst (level 4)", with "Maximum government funding for apprenticeship training and assessment costs" of £15,000. Say "the Level 4 data analyst apprenticeship", because other Level 4 data-related standards may differ. "Find apprenticeship training" would be a clearer source name |
| Callout (ICO, warning) | Lawful basis, tell workers, least intrusive option | S | Text as before |

### Links changed to landing pages

| Link (article use) | Resolves? | Offers or describes the named document? | Still supports the claim? | Newer edition? |
|---|---|---|---|---|
| Make UK, AI, skills and the future… | Yes | Yes, PDF download; page dated 8 June 2026 | Yes. The page gives the 2%; the 43% is only in the PDF | No |
| ONS BICS wave 165 | Yes | Yes, `bicswave1652final.xlsx` | Yes. The page shows "Release date: 19 November 2026", which appears to be the dataset's release date; the file is still wave 165 | Later waves exist but have no AI questions (see Derived figures) |
| RAND RRA2680-1.html | Yes | Yes, with PDF; 13 August 2024 | Yes. The summary gives 65 interviewees, leadership first and data second | No |
| Make UK, Future Factories Powered by AI | Yes | Yes, PDF; 25 November 2024; Autodesk named | Figures are only in the PDF | No |
| GOV.UK AI adoption survey 2026 | Yes | Yes: the same PDF (now titled "AI adoption survey report 2026"), an executive summary and ODS tables; 29 October 2026 | Yes (PDF Figure 23) | No |
| Made Smarter AI adoption toolkit | Yes | Yes, white paper download; 22 April 2026 | Yes (PDF p.10) | No |
| NAO, challenges in implementing digital change | Yes | Yes, report and summary PDFs; 21 July 2021 | Yes | No |
| Drexel LeBow news page | Yes | Describes the survey and links the 2025 Outlook PDF; dated 16 September 2024 | Partly. The page gives 565 respondents but not the 67% trust figure, which needs the PDF | None mentioned |
| NIST SP 800-82r3 (CSRC) | Yes | Yes, Rev. 3 final (September 2023) with PDF | Yes | **An initial public draft of Rev. 4 was posted on 21 September 2026, with comments due by 30 November 2026.** Rev. 3 is still the final version. Recheck the 10 to 15 year and adjacent-levels points once Rev. 4 is final |
| NCSC secure connectivity principles (collection page, used twice) | Yes | Yes, links the PDF | The page only summarises the principles; all four NCSC claims are in the PDF. It shows "Reviewed 18 March 2024, Version 1.0", which sits oddly with the further-reading date "NCSC, 2026" (taken from the PDF's Crown copyright). That may confuse readers | No |
| Made Smarter KPI statistics | Yes | Yes, PDF; page dated 6 June 2025 | Yes, and the tables are on the page itself | No FY2025/26 edition mentioned |
| GOV.UK Made Smarter Adoption research project | Yes | Same PDF; "Published 4 March 2024" by the Department for Business and Trade; Cambridge not named | The figures are; the date visibly differs from "published in 2023" (row 37) | No |
| Ofgem decision page (tools: templates) | Yes | Offers "Data Best Practice Templates" (zip) and the v1 guidance; dated 15 November 2021 | **Partly.** The zip holds Field Level Information (field reference or column number, title, description, collection and input method, unit, precision, quality), which supports "a data dictionary explaining every column". The Stakeholders template lists each dataset's data users and prospective users, but **has no column for why** they use it. The zip also holds Supporting Information, Open Data Triage and User Research templates | The v1 guidance on this page is superseded by the 2026 RIIO-3 versions. The templates appear only here |
| Ofgem RIIO-3 guidance page (further reading) | Yes | Lists "Data Best Practice Supporting Information" (PDF, `2026-03/…`); page dated 1 April 2026 | Yes | This is the current edition |
| BSI Knowledge, PAS 1040:2019 | Yes | Yes, PAS 1040:2019, current, 31 August 2019 | **Partly.** No price is shown. The page offers "a DRM free copy" through a link to a BSI registration form that asks for name, email, job title, company and marketing preferences. "Free to download" is probably still right, but readers now have to register. The nine-point scale isn't on the landing page (the first check confirmed it in the PDF) | No |
| Made Smarter technical guide (further reading) | Yes | Yes, download; "Published 20/07/2026" | Yes. This confirms the 2026 date the first check couldn't | No |
| Make UK, Demystifying Digitalisation (further reading) | Yes | Yes, PDF; page dated 16 October 2023; AWS named as partner | Yes | No |
| draw.io, Visio (new) | Yes | Yes | Yes (row 27) | n/a |

### Diagrams

- **`data-foundations-data-map.svg` (redrawn):** the title says "An illustrative one-page data map", the description starts "An invented example", and the footer says "not a real plant". The tag name (S3_LOAD), owners and retention period are fictional and clearly presented that way. One small inconsistency: the caption and alt text say each box records "format, owner and update rate", but the Historian box has a custodian and no update rate, and the OEE report box has no owner. Suggest "format and, where known, owner and update rate".
- **Hierarchy figure:** the caption now says "a mock factory example", which is fine, and the SVG text still says "An invented example". The article's alt text now says "data hierarchy", while the SVG's own description still says "A pyramid". Harmless.
- **Both-ends caption ("from the existing data"):** generic, with no factual claim.
- No diagram presents a figure as real.

### Front matter

- **Description:** "How UK industrials can understand their data…". "Industrials" as a noun is mainly an investment term for industrial companies' shares, so "industrial firms" or "manufacturers" reads better. The body supports the rest.
- **Gist:** "Poor data is one of the most common reasons digital projects stall" stretches evidence about AI projects (RAND, Make UK, Deloitte, MIT TR) to digital projects in general. It also drops "alongside leadership, unclear goals, cost and skills", which the first check asked for, even though the body ranks leadership first (RAND 84%) and business-case clarity first among non-adopters (DSIT). As written, it implies data comes first. Suggested wording: "Poor data is one of the most common reasons AI projects stall, alongside leadership, unclear goals, cost and skills, so understand your data landscape before you buy the tool." "Critical before you buy the tool" is fine as the article's recommendation.

### Spelling and grammar

There are no American spellings in the article's prose. "center" appears only in the Drexel URL and "Organization" only in the ISKO title. Slips:

- "Endlessly optimising… may be an endless task" says the same thing twice.
- Two "But" sentences in a row in the Deloitte passage ("But some firms… But only about one in five…").
- "When taken together, digital tools stay…" is a dangling modifier. Try "Taken together, the evidence suggests digital tools stay…".
- "speaking to people that run the process": use "who run".
- "where data starts, where it works, where it is lost…": "where it works" is unclear.
- "the two views can be reconciled, making the perfect starting point" is dangling. Try "and that meeting point is the place to start".
- "release product to a customer for example." needs a comma before "for example".
- "leaving it alone if for example:" needs commas: "if, for example:".
- "(our estimated calculation)": use "our calculation" (row 36).
- "But it's not only data in isolation, and other adjacent barriers are important to consider." is awkward. Try "Data isn't the only barrier, though."
- Trailing spaces at the ends of lines 83, 128, 143, 145 and 209 (harmless when rendered).

### Resolved (25 November 2026)

Claude fixed the flags in its own text: "our calculation" labels, the £79,750 source line, the PAS 1040 access note, and the grammar slips listed above. Nikita decided on each flag in his own wording:

- **Changed (accepted):** RAND covers "AI projects"; "some firms do use AI in operations"; distrust of data "seems to be part of the reason"; Grieves paraphrased as "of little use"; the ISO 19650 table labelled as "the illustrative translation below is our own"; the governance rhythm reworded to "could include"; the Ofgem register "who uses each dataset and what they need from it"; "locked behind paywalls" reworded to "usually locked behind paywalls".
- **Kept as written (Nikita's decision):**
  - the opening "AI or modern digital tools … failing to scale";
  - "not in the field or on the shop floor, but are mostly in the offices";
  - "(likely supporting internal reports and presentations)";
  - the MIT Technology Review Insights survey without its sponsor;
  - "Data are simple symbols…" without Ackoff;
  - the gist's "digital projects".
- **Still without a source:** three passages remain unsourced. They are "not in the field or on the shop floor", "(likely supporting internal reports and presentations)" and "usually locked behind paywalls". They rest on Nikita's own industry experience, and he kept them on that basis.
- **Style changes from the humanizer:** Nikita accepted 16, 17, 18, 21, 22, 24, 25 and 26, and kept his own wording for 15, 19, 20 and 23.
- **Not changed:** Cambridge "published in 2023" stays, because the report itself is dated February 2023.
