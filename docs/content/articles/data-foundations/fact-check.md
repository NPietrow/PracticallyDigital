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
