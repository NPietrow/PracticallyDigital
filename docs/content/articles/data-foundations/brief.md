# Research brief: Data foundations

- **Issue:** [#9](https://github.com/NPietrow/PracticallyDigital/issues/9), "A Data-First Approach to Digital Transformation"
- **Article file:** `src/content/articles/data-foundations.mdx`, published at `/insights/data-foundations/`
- **Topics:** `data-foundations`. **Problems:** `untrusted-data`, `skills-and-adoption`
- **Title:** A Data-First Approach to Digital Transformation (Nikita, 24 November 2026)
- **Research date:** 18 November 2026, with a follow-up on 24 November 2026
- **Status:** approved by Nikita with changes on 24 November 2026 (see "Decisions" at the end).

## Angle

**Understand your data landscape first, and build with the end goal in mind** (Nikita's wording, 24 November 2026).

Vendors sell AI, digital twins and analytics as quick wins, and most UK manufacturers have tried something. Few have got it onto the shop floor. Before buying a tool, a leader should know what data the business has, where it comes from, who owns it and whether it can be trusted. That understanding is cheap, and it is what every later investment stands on. "Build with the end goal in mind" means naming the decision the data will serve and the measurable benefit expected, then bringing only that part of the data up to the quality the decision needs. Fixing everything first is not the aim. The reader leaves knowing where to start on Monday, who owns what, what it costs and when to leave well alone.

**Why this fits the evidence.** The research doesn't support "fix all the data first" as a blanket rule. Leadership and unclear use cases rank at or above data as causes of failure (claims 7, 10, 11 and 13), and Made Smarter advises against waiting for perfect data (claim 15). It does support understanding the data before committing: the NAO finds programmes that leave data until later run into delay (claim 16), and the methods in claims 22 to 34 all start with mapping and stating needs.

## What already exists, and the gap

UK guidance falls into three groups:

- **Short manufacturer guides that name the problem.** Made Smarter's [Data & System Integration guide](https://www.madesmarter.uk/media/yjajvc0y/made-smarter-data-system-integration-tech-guide.pdf) and [AI Adoption toolkit](https://www.madesmarter.uk/media/mkvfwcud/ms-ai-adoption-white-paper.pdf), Make UK's [Demystifying Digitalisation](https://makeuk.org/docs/demystifying-digitalisation/download) and BSI's [PAS 1040](https://www.bsigroup.com/en-GB/insights-and-media/insights/brochures/pas-1040-digital-readiness/).
- **Rigorous frameworks written for other audiences.** Ofgem's [Data Best Practice](https://www.ofgem.gov.uk/sites/default/files/2026-03/data-best-practice-supporting-information.pdf), the [Government Data Quality Framework](https://www.gov.uk/government/publications/the-government-data-quality-framework) and the [data ownership model](https://www.gov.uk/government/publications/data-ownership-in-government/data-ownership-model).
- **Policy and AI documents that treat data as a barrier**, such as the [AI Adoption Plan for Advanced Manufacturing](https://www.gov.uk/government/publications/ai-champions-ai-adoption-plans/ai-adoption-plan-advanced-manufacturing).

We could not find a UK publication on data foundations written for a plant manager. That is the result of a non-exhaustive search, so the article should say "we could not find", not "nobody has published".

**What this article adds:**

- ownership that works across shifts, maintenance and quality;
- a first-month routine for one process;
- the government's methods translated into factory terms;
- pound figures, which none of the five guides checked for costs contains;
- a plain statement of when not to bother;
- candour about the evidence, including the popular statistics that don't survive checking.

The four sources named in the issue (two IBM pages, Forbes Technology Council, Analytics8) are all written by organisations with something to sell, and none is about UK plants. They inform the framing. Only IBM's description of the data stack is cited (claim 35).

## Outline

About 3,000 words. Headings are proposals.

| # | Proposed H2 | What it covers | Claims |
|---|---|---|---|
| | *(Opening, no heading)* | The vendor promise against the shop-floor reality. The argument in one paragraph | 1 to 5 |
| 1 | Why the tools disappoint | Data is a real cause of failure, but leadership and problem choice rank with it. Why "fix all the data first" is the wrong conclusion, and why understanding comes first | 6 to 8, 10 to 13, 15, 16 |
| 1a | Why most of it stays low risk | Nikita's hypothesis, as the evidence supports it: tools stay advisory and unscaled, and untrusted data is one reason among several | 2, 4, 55 to 61 |
| 2 | What data foundations are | A plain definition: knowing what data you have, where it comes from, who owns it, whether it can be trusted, and how it reaches the decision. The warning signs from the issue: giant spreadsheets, re-keying, knowledge in people's heads, data locked in a vendor's system | 9, 17, 22, 23 |
| 3 | Start by mapping what you have | Critical data first. One value stream. What to record. Show the map to stakeholders (Nikita's experience) | 24 to 26 |
| 4 | Work from both ends | Top down from the decision (ISO 19650's requirements logic, offered as our own analogy) and bottom up from the data you already hold | 27 to 29 |
| 5 | What data governance means on a Tuesday | Owner, steward, custodian in factory roles. A weekly, monthly and annual rhythm. Worker data | 30, 31, 46 |
| 6 | Measure quality against the job | Fitness for purpose. Six dimensions as plant measures. Fix at source | 32 to 34 |
| 7 | Get the knowledge out of people's heads | Why it matters, how to capture it, and why a repository alone fails | 43 to 45 |
| 8 | Build only the architecture you need | Sources, ingestion, storage, transformation, visualisation, governance. How factories differ from IT. Security and machine data access when buying. Platforms and UNS are left for a later article | 35 to 42 |
| 9 | What it costs, and when not to bother | **Costs, limitations and "when not to bother" are all here.** Real figures, funding (Made Smarter introduced with its self-reported benefits, then the case for measuring your own), skills options, and a plain checklist for leaving things alone | 47 to 54 |
| 10 | Your first month | One process, one owner, week by week. Editorial, and labelled as our suggestion | none |
| 11 | Tools and resources | Things to use | see below |
| 12 | Further reading | Things to read | see below |

## Claims

Evidence labels in the "Where" column: **[A]** extracted directly from the primary file; **[O]** primary source opened; **[R]** read through a tool that summarises pages, so the wording needs checking; **[D]** our arithmetic on cited figures, with the working shown. The fact-check step opens every source again.

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 1 | About 20% of UK manufacturers used at least one AI technology in late September 2026, against about 30% of all businesses | https://www.ons.gov.uk/file?uri=/economy/economicoutputandproductivity/output/datasets/businessinsightsandimpactontheukeconomy/bicswave165/bicswave1652final.xlsx | BICS Wave 165, sheet AI Current Usage TS (WTD): 100 minus 76.1 (not using) minus 3.7 (not sure) = 20.2. [A] [D]. Recheck against the release due 19 November 2026 | figure |
| 2 | Manufacturers' AI use leans to visual content (12.2%) and text generation (10.3%), against 4.0% for data processing with machine learning and 2.3% for robotics | Same as claim 1 | BICS Wave 165, AI usage sheets, September 2026. [A] | figure |
| 3 | In Make UK's 2026 member survey, 2% had AI widely embedded, 37% moderate use, 43% limited experiments and 18% had not adopted it. The report gives no sample size | https://www.makeuk.org/docs/ai-skills-and-future-uk-manufacturing-sectorpdf/download?attachment | p.3 and Chart 1, p.7. [A] | figure |
| 4 | Make UK's respondents use AI mainly in business support (83%), with production at 11% and quality control at 6% | Same as claim 3 | p.8. [A] | figure |
| 5 | 5% of 151 manufacturers surveyed in 2024 had successfully adopted simulation or digital twins (Autodesk was the survey partner) | https://makeuk.org/docs/future-factories-powered-aipdf/download | p.2 and p.7. [A] | figure |
| 6 | In the same survey, 35% named data management challenges as a main barrier to AI, behind complexity and system integration (44%), implementation cost (44%) and technical challenges (39%) | Same as claim 5 | Chart 6, p.17. [A] | figure |
| 7 | Among 2,043 UK businesses neither using nor planning AI, understanding how it could help (62%) and a clear business case (61%) ranked above better data infrastructure or quality (41%) | https://assets.publishing.service.gov.uk/media/6ae202189bca21f1c5036e99/artificial-intelligence-adoption-research-report-2026.pdf | Figure 23, PDF p.58. All sectors. [A] | figure |
| 8 | Among UK businesses handling digital data, 72% analyse it, but only 46% agree that the analysis supports their decisions | https://www.gov.uk/government/publications/business-data-use-and-productivity-study-wave-2/business-data-use-and-productivity-study-wave-2-statistical-report | Statistical report. All sectors. [R] | figure |
| 9 | *Dropped 24 November 2026: from the Made Smarter impact evaluation, which Nikita asked us not to discuss* | | | |
| 10 | In RAND's interviews with 65 experienced data scientists and engineers, 84% named leadership-driven failures as a primary reason AI projects fail. RAND notes that its mostly non-managerial sample may skew blame towards leaders | https://www.rand.org/content/dam/rand/pubs/research_reports/RRA2600/RRA2680-1/RAND_RRA2680-1.pdf | p.5. [O] | figure |
| 11 | Data problems ranked second in RAND's study, and 30 of 50 industry interviewees discussed persistent data quality problems | Same as claim 10 | Table 1, p.5 and p.7. [O] | figure |
| 12 | RAND reports that legacy data kept for compliance or logging often doesn't suit training AI | Same as claim 10 | p.7. [O] | fact |
| 13 | A US Census study of more than 30,000 manufacturing plants linked predictive analytics to higher productivity only alongside IT capital, educated workers or high-flow production | https://digitaleconomy.stanford.edu/publication/the-power-of-prediction-predictive-analytics-workplace-complements-and-business-performance | Abstract. US data. [O] | fact |
| 14 | *Dropped 24 November 2026 at Nikita's request: the programme's approach may change, so the article doesn't discuss its evaluation results* | | | |
| 15 | Made Smarter's AI toolkit advises manufacturers not to wait for perfect data | https://www.madesmarter.uk/media/mkvfwcud/ms-ai-adoption-white-paper.pdf | pp.10 to 11. [O] | fact |
| 16 | The National Audit Office found government programmes often fail to address data at the start, causing concern and delay later | https://www.nao.org.uk/wp-content/uploads/2021/07/The-challenges-in-implementing-digital-change.pdf | HC 575, para 2.20, p.30. Public sector. [O] | fact |
| 17 | In a 2022 survey commissioned by software vendor Intoware, 74% of 1,030 respondents at UK industrial businesses said they relied on legacy systems and spreadsheets | https://www.themanufacturer.com/articles/74-of-manufacturers-held-back-by-disconnected-data/ | Article text. Vendor survey, combined measure. [R] | figure |
| 18 | *Dropped 24 November 2026 at Nikita's request (conflict of interest: the case study involves his former employer)* | | | |
| 19 | Network Rail Wales & Western made 306 interventions at 36 sets of points, prioritised using reliability data. In-scope delay minutes fell 53% (27,980 fewer) in FY26, equated to £3.6m of avoided cost, though route-wide points delay still rose | https://www.networkrail.co.uk/wp-content/uploads/2026/06/NR-WW-Performance-Improvement-Report.pdf | Operator-authored, 20 April 2026. [O] | example |
| 20 | Sheffield Forgemasters replaced paper cards and spreadsheets with a manufacturing execution system and reported office paper and spreadsheet costs down 40% and planning efficiency up 20% | https://www.madesmarter.uk/resources/case-study-sheffield-forgemastersmestec/ | Case study, 23 December 2021. Programme-authored, no baseline. [O] | example |
| 21 | At the Royal Hospital for Children and Young People in Edinburgh, a 2012 Excel environmental matrix listed 4 air changes an hour for critical care although its own guidance tab required 10. Internal audit judged this likely human error in copying generic criteria | https://org.nhslothian.scot/keydocuments/wp-content/uploads/sites/28/2023/05/InternalAuditReport_GovernanceInternalControlsRHCYPAug2020.pdf | Para 146, p.18 and paras 43 to 46. [O] | example |
| 22 | The government's data lifecycle has six stages: plan; collect, acquire and ingest; prepare, store and maintain; use and process; share and publish; archive or destroy | https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework | "The data lifecycle". [R] | fact |
| 23 | Valid data can still be wrong: a value can pass a format check and misdescribe the real thing | https://www.gov.uk/government/news/meet-the-data-quality-dimensions | Article text, 24 June 2021. [R] | fact |
| 24 | UK Government guidance says to identify critical data first, by looking at demand and reliance by others, and to give each critical asset a named owner | https://www.gov.uk/government/publications/identify-and-record-critical-data-assets/identifying-and-recording-critical-data-assets | Guidance text. [R] | fact |
| 25 | Public guidance supports recording, for each data asset: name and description, source and location, purpose, format, owner, update frequency, quality status, consumers and retention | https://www.gov.uk/government/publications/record-metadata-to-describe-critical-data-assets/recording-metadata-to-describe-critical-data-assets | Section 5, with the ICO toolkit in claim 26. [R]. Signal name, units and sample rate are our own additions for machine data | fact |
| 26 | The ICO's records management toolkit expects a data flow map built from an information audit, with a named person responsible in each area. It covers personal data and is under review | https://cy.ico.org.uk/for-organisations/advice-and-services/audits/data-protection-audit-framework/toolkits/records-management/data-mapping-and-recording/ | Toolkit text. Applying it to machine data is our adaptation. [R] | fact |
| 27 | ISO 19650 guidance reverses the usual flow: the receiver works out why it needs information and states what it needs before the provider produces it, and should ask only for what it needs to avoid waste | https://www.ukbimframework.org/wp-content/uploads/2021/02/Guidance-Part-D_Developing-information-requirements_Edition-2.pdf | Sections 1.2.2, p.11 and 1.2.3.2, p.14. [R]. Check for a later edition | fact |
| 28 | In ISO 19650, organisational information requirements (OIR) feed asset (AIR) and project (PIR) requirements, which feed detailed exchange requirements (EIR) | Same as claim 27 | Sections 1.3 to 1.7, Figures 15 and 16, pp.18 to 37. [R]. The manufacturing translation is our own analogy and must be labelled as one | fact |
| 29 | acatech takes the opposite view, arguing that companies should stop collecting data only for a specific analysis and keep an up-to-date model of the whole company | https://en.acatech.de/publication/industrie-4-0-maturity-index-update-2020/download-pdf?lang=en | Section 3.1.3, p.19. [R] | fact |
| 30 | The UK Government's data ownership model defines three roles: the data owner (accountable, sets definitions and approves changes), the data steward (monitors and fixes quality issues, answers queries) and the data custodian (stores and secures the data to the owner's requirements) | https://www.gov.uk/government/publications/data-ownership-in-government/data-ownership-model | Roles section, 16 April 2026. Written for government. [R] | fact |
| 31 | Government policy requires each identified data asset to have a named accountable owner, with its metadata reviewed annually | https://www.gov.uk/government/publications/data-asset-management-policy-in-government/data-asset-management-policy-in-government | Policy text, 27 May 2026. [R] | fact |
| 32 | The Government Data Quality Framework treats quality as fitness for purpose and uses six dimensions: completeness, uniqueness, consistency, timeliness, validity and accuracy | https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework | "Data quality dimensions". [R] | fact |
| 33 | The framework's guidance says: "Always fix problems in data quality as close to the source as possible." | https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework-guidance | "Data quality root cause analysis". [R]. The only direct quotation in this brief | fact |
| 34 | The framework says required quality varies with purpose, effort should go on the most critical data, and perfect quality may not be achievable | Same as claim 32 | Framework text. [R] | fact |
| 35 | IBM describes the modern data stack as five core layers: storage, ingestion, transformation, business intelligence and analytics, and observability | https://www.ibm.com/think/topics/modern-data-stack | "Fundamental components". Vendor-authored, used as a general pattern. [R] | fact |
| 36 | Factory systems differ from office IT: they are time-critical, outages are planned days or weeks ahead, human safety comes first, and components last about 10 to 15 years against three to five for IT | https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf | NIST SP 800-82r3, Table 1, pp.30 to 31. [R] | fact |
| 37 | ISA-95 levels run from the physical process (0), through sensors (1), control by PLC or DCS (2) and operations by MES or SCADA (3), to business planning by ERP (4) | https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard | Standard page, with https://reference.opcfoundation.org/specs/OPC-10030/4.2.3. [R] | fact |
| 38 | NIST advises that firewall rules permit connections only between adjacent levels, so business systems at level 4 should not talk directly to levels 2, 1 or 0 | Same as claim 36 | p.73. [R] | fact |
| 39 | The NCSC's principles start every OT connection with a business case covering the requirement, benefit, risk and a senior risk owner, and say obsolete devices are unsuitable for direct external connectivity | https://www.ncsc.gov.uk/files/ncsc-secure-connectivity-for-operational-technology.pdf | Principle 1, p.5 and Principle 2, pp.11 to 12. [O] | fact |
| 40 | Where operational data must be shared, the NCSC suggests replicating the OT historian to a DMZ through a one-way transfer, and advises preferring open standards such as OPC UA over TLS and MQTT over TLS | Same as claim 39 | Principle 4, pp.18 to 19. [O] | fact |
| 41 | The EU Data Act covers industrial machinery, but a user must be established in the EU to rely on its access right, so it doesn't help a UK factory | https://ec.europa.eu/newsroom/dae/redirection/document/108144 | Commission FAQ v1.4, Q7 and Q15. The FAQ says it isn't an authoritative position. [O] | fact |
| 42 | Part 1 of the UK's Data (Use and Access) Act 2025 gives ministers powers to make regulations. We found no regulations under it giving factory users a right to machine data, so access has to be written into the purchase contract | https://www.legislation.gov.uk/ukpga/2025/18/part/1 | Part 1. The second sentence is our finding and inference. [O] | fact |
| 43 | HSE warns that important knowledge at most sites is unrecorded and can be lost during organisational change | https://www.hse.gov.uk/pubns/chis7.pdf | CHIS7, p.5. [R] | fact |
| 44 | The Critical Decision Method captures expertise by walking an expert through a real, non-routine incident, though it needs a skilled interviewer | https://digital.ahrq.gov/health-it-tools-and-resources/evaluation-resources/workflow-assessment-health-it-toolkit/all-workflow-tools/critical-decision-method | Tool description. [R] | fact |
| 45 | A repository alone isn't enough: a 2012 audit found only 16 of 28 surveyed NASA project managers used the agency's lessons database | https://www.oversight.gov/sites/default/files/oig-reports/IG-12-012.pdf | IG-12-012, pp.ii to iii. [R] | figure |
| 46 | Employers monitoring workers need a lawful basis, must tell workers and should choose the least intrusive option. Data collected for one purpose shouldn't be reused for performance management without a new lawful basis | https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/monitoring-workers/data-protection-and-monitoring-workers/ | Guidance text, under review. [O] | fact |
| 47 | Made Smarter Adoption supported 559 grant projects from 2022/23 to 2024/25 with £7.82m of grant and £16.61m of matched spending, a mean of about £43,700 a project across all digital technologies | https://www.madesmarter.uk/media/f54h0k1g/made-smarter-adoption-kpi-statistics-fy202223-fy-202425.pdf | Tables 3, 4a and 4b. (7.82 + 16.61) ÷ 559. Assumes Table 4b is the business contribution. [O] [D] | figure |
| 48 | Advertised UK data engineer salaries have a median of £70,000 across all sectors, or about £79,750 with 15% employer National Insurance, before pension | https://www.itjobswatch.co.uk/jobs/uk/data%20engineer.do | Six months of adverts to November 2026, with rates at https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027. [O] [D] | figure |
| 49 | Data apprenticeships are funded up to £13,000 (Level 3 data technician) and £15,000 (Level 4 data analyst). A non-levy employer's 5% share for a learner aged 25 or over is £650 or £750, and nothing for ages 16 to 24 | https://www.gov.uk/government/publications/apprenticeship-technical-funding-guide/apprenticeship-technical-funding-guide-from-august-2026 | Co-investment section, with https://findapprenticeshiptraining.apprenticeships.education.gov.uk/courses/576 and https://findapprenticeshiptraining.apprenticeships.education.gov.uk/courses/80. Wages are extra. [O] [D] | figure |
| 50 | Made Smarter Adoption is open to SMEs with manufacturing premises in England, with terms that vary by region and match-funded grants of up to £20,000 listed in several regions | https://www.madesmarter.uk/adoption/ | Programme page, checked 18 November 2026. Recheck before publishing. [O] | fact |
| 51 | Knowledge Transfer Partnerships are open, with grant rates of 67% for SMEs and 50% for large businesses on full economic cost projects | https://www.ukri.org/councils/innovate-uk/guidance-for-applicants/costs-we-fund/costs-guidance-for-knowledge-transfer-partnerships/grant-rates/ | Grant rates page, with https://www.ukri.org/opportunity/knowledge-transfer-partnership-2026-to-2027-round-4/. Don't state a closing date: UKRI's pages disagree. [O] | fact |
| 52 | An AMRC demonstrator connected a legacy machine with about £400 of hobby-grade hardware, but that excludes installation, integration, security and support, and it sampled too slowly for useful condition insight | https://www.amrc.co.uk/files/document/239/1542365809_WHITE_PAPER_LEGACY_AW.pdf | Sections 1 to 3 and Table 1. Prices are several years old. [O] | figure |
| 53 | The government's AQuA Book says assurance should be proportionate to the effect, size and complexity of the analysis | https://www.gov.uk/guidance/the-aqua-book | Chapters 2 and 3. [O] | fact |
| 54 | In a 2023 University of Cambridge survey of 155 Made Smarter Adoption participants, around 90% had adopted digital technologies and 97% of those reported benefits, including better production planning (76%), better use of data (74%) and cost reductions (69%). The benefits are self-reported, with no comparison group | https://assets.publishing.service.gov.uk/media/65e06d14cf7eb1b0e5f57f3e/made-smarter-adoption-report.pdf | Cambridge IfM, February 2023, pp.10 and 20. [A]. Used to introduce the programme, followed by the point that a firm should measure its own baseline and result | figure |

| 55 | Deloitte's 2026 survey of more than 140 manufacturers found only about one in five AI use cases scaled across sites or enterprise-wide, and 18% using closed-loop ("physical AI") systems. Adoption by function was highest in quality (62%) and production (57%) | https://www.deloitte.com/ch/en/Industries/industrial-construction/perspectives/ai-in-manufacturing.html | Page dated 30 June 2026. Consultancy-authored; region and fieldwork not stated. [R] | figure |
| 56 | In the same survey, data availability or quality ranked fifth among implementation challenges (30%), behind cost (43%), lack of expertise (35%), resistance to change (35%) and regulatory or compliance concerns (34%) | Same as claim 55 | Implementation challenges. [R] | figure |
| 57 | In a 2024 survey of 300 manufacturing executives, the AI uses most likely to have reached production were product design, chatbots and content creation. Only about one in five manufacturers had production assets with data ready for current AI models, and inadequate data quality (57%) and weak data integration (54%) were the top data barriers to scaling | https://www.microsoft.com/en-us/microsoft-cloud/blog/manufacturing/2024/04/09/industrial-transformation-scaling-ai-across-the-manufacturing-value-chain/ | MIT Technology Review Insights, commissioned by Microsoft (vendor-sponsored); as reported on Microsoft's blog, 9 April 2024. [R]. Open the report itself if one is linked | figure |
| 58 | An HSE study of 247 AI use cases across 14 regulated sectors found the largest single category was drafting health and safety documents (25.1%), with predictive maintenance at 3.6%. Data quality and availability was the most often reported challenge, and respondents kept humans approving safety-critical outputs. The authors say the sample is not statistically representative | https://www.icheme.org/media/29576/hazards-35-paper-11-chambers.pdf | IChemE Hazards 35 paper, 2025: PDF p.11 (categories), p.14 (human approval), p.15 (challenges), p.17 (sample). [A] | figure |
| 59 | In a vendor-sponsored 2025 survey of 565 data and analytics professionals across all sectors (9% in manufacturing), 67% said they don't completely trust the data their organisation uses for decision-making | https://www.lebow.drexel.edu/sites/default/files/2024-09/drexel-lebow-precisel-data-integrity-trends-insights-2025-outlook.pdf | Precisely and Drexel LeBow, 2025 Outlook, PDF pp.3, 5 and 6. [A]. Label as all-sector and vendor-sponsored | figure |
| 60 | HSE says the law requires a risk assessment for any use of AI that affects workplace health and safety | https://press.hse.gov.uk/?p=8268 | HSE statement, 12 June 2026. [R] | fact |
| 61 | In a field experiment at an electronics factory, showing workers why the AI flagged a defect (explainable AI) cut their median error rate five-fold compared with an unexplained ("black-box") AI | https://arxiv.org/abs/2406.08271 | Senoner et al., arXiv preprint, 12 June 2024. Not peer reviewed. [R] | fact |

### Where data is trusted, and where it isn't (Nikita's hypothesis, checked 24 November 2026)

The hypothesis was: data-driven digitisation has mostly stayed in low-risk areas, probably because people don't trust the data. The research checked each half separately.

- **Where it's used: partly supported.** UK figures show AI mostly in office and generative tasks (claims 2 and 4), and the uses most likely to reach production are low-stakes (claim 57). But large manufacturers do use AI most in quality and production (claim 55). The pattern that holds up is that most AI isn't scaled beyond a site or a pilot, and that where it touches operations it usually advises a person rather than acting alone (claims 55 and 58).
- **Why: partly supported.** Data quality is among the most consistently cited barriers (claims 6, 57 and 58), and distrust of data is common (claim 59). But no source shows that distrust of data is why firms keep AI out of high-stakes decisions. Cost, skills, resistance to change and regulation rank alongside or above it (claim 56). For safety decisions, the law and accountability for the AI system itself keep a person in the loop (claims 58, 60 and 61). Cheap generative tools that need no plant data are a simpler explanation for the office-heavy pattern (claim 58).

**How the article uses it:** in most firms, data-driven tools have stayed in advisory or low-stakes roles and haven't scaled, and poor or fragmented data is one of the most often cited reasons, alongside cost, skills and resistance to change. Understanding your data landscape is what lets you trust the data enough to move a tool from advising to deciding, but it isn't the only gate. This supports the angle without overclaiming. Claim 59 is all-sector and vendor-sponsored, and the article must say so.

### Statistics we checked and won't use

Popular figures that failed the check. Listed so they don't creep back in during editing.

| Claim | Why not |
|---|---|
| "80% of AI projects fail" (credited to RAND) | RAND cites it as an outside estimate and measured no failure rate |
| "95% of GenAI pilots fail" (MIT NANDA) | Preliminary, with inconsistent definitions of success |
| "70% of digital transformations fail" | No valid empirical basis has been traced |
| "X% of AI projects fail because of data" | No source measures data's share of failures |
| "80% of data science time is spent cleaning data" | Traces to a misread survey chart |
| "Bad data costs the US $3.1 trillion a year" | An estimate with no published method |
| "99% of industrial data is wasted" | Stretches a 2015 McKinsey remark about one oil rig |
| "74% of manufacturers rely on spreadsheets" (credited to Made Smarter) | It is a 2022 vendor survey (claim 17) and combines legacy systems with spreadsheets |
| Made Smarter's +16.3% turnover, +12.5% jobs or 38% to 51% GVA per worker | None held up under the evaluation's robust methods, and the authors reject the GVA figure |
| "Data quality is the top barrier to AI in UK industry" | UK surveys rank it mid-table or don't ask |

Gartner, McKinsey and S&P Global figures are held back because their pages couldn't be opened directly. They can only come in if someone reads them at source.

## Tools and resources candidates

| Resource | What it's for, and who it suits | Cost |
|---|---|---|
| [GDS data quality action plan and template](https://www.gov.uk/government/publications/implement-a-data-quality-action-plan) | Prioritising and tracking quality issues, for whoever owns the first process | Free |
| [Ofgem Data Best Practice templates](https://www.ofgem.gov.uk/sites/default/files/2021-11/data_best_practice_templates.zip) | Field-level template that works as a data dictionary | Free |
| [Data ownership model](https://www.gov.uk/government/publications/data-ownership-in-government/data-ownership-model) | Role descriptions, RACI matrix and checklist to adapt | Free |
| [diagrams.net](https://www.drawio.com/) | Drawing the data map, no specialist skills needed | Free, open source |
| [OpenRefine](https://openrefine.org/) | Cleaning messy spreadsheets without code | Free, open source |
| [DuckDB](https://duckdb.org/) | Querying large CSV exports on a laptop, for an engineer comfortable with SQL | Free, open source |
| [Grafana](https://grafana.com/oss/grafana/) | Dashboards for plant time-series data | Free, open source; paid cloud exists |
| [Node-RED](https://nodered.org/) and [Eclipse Mosquitto](https://mosquitto.org/) | Low-code machine connections and an MQTT broker, for controls engineers | Free, open source |
| [Shoestring](https://www.digitalshoestring.net/) | Low-cost downtime, power and location monitoring for SMEs | Free software; hardware cost applies |
| [PAS 1040:2019](https://fcms.bsigroup.com/siteassets/pdf/en/insights-and-media/insights/brochures/pas_1040_2019.pdf) | Nine-point digital readiness scale for manufacturers | Free PDF |
| [Made Smarter readiness review](https://www.madesmarter.uk/adoption/plan-for-your-digital-transformation/) | Adviser-led review and roadmap for SME manufacturers in England | Funded in some regions; check yours |
| [NCSC definitive view of OT architecture](https://www.ncsc.gov.uk/collection/operational-technology/definitive-architecture-view) | Keeping an accurate record of OT assets and connections | Free |
| [OpenLearn: Using data to aid organisational change](https://www.open.edu/openlearn/money-business/using-data-aid-organisational-change) | A free 10-hour course for managers | Free |

## Further reading candidates

| Reading | Why |
|---|---|
| [Data & System Integration for manufacturers](https://www.madesmarter.uk/media/yjajvc0y/made-smarter-data-system-integration-tech-guide.pdf), Made Smarter, 2026 | The quickest plain-English introduction, and the natural companion to this guide |
| [AI Adoption in Manufacturing](https://www.madesmarter.uk/media/mkvfwcud/ms-ai-adoption-white-paper.pdf), Made Smarter, 2026 | Where data readiness fits into an AI decision |
| [The Government Data Quality Framework](https://www.gov.uk/government/publications/the-government-data-quality-framework), Government Data Quality Hub, 2020 | The clearest UK statement of quality as fitness for purpose |
| [Data Best Practice Supporting Information](https://www.ofgem.gov.uk/sites/default/files/2026-03/data-best-practice-supporting-information.pdf), Ofgem, 2026 | The fullest UK regulator statement of good data practice |
| [The root causes of failure for AI projects](https://www.rand.org/pubs/research_reports/RRA2680-1.html), RAND, 2024 | Short, readable, and honest about leadership as well as data |
| [Secure connectivity principles for operational technology](https://www.ncsc.gov.uk/files/ncsc-secure-connectivity-for-operational-technology.pdf), NCSC, 2026 | Read before connecting any plant system to anything |
| [Demystifying Digitalisation](https://makeuk.org/docs/demystifying-digitalisation/download), Make UK with AWS, 2023 | Good management questions, with AWS as the partner |

## Diagrams

Hand-drawn SVGs in the site's colours:

1. **From sensor to decision.** The six layers (sources, ingestion, storage, transformation, visualisation, with governance running underneath), with factory examples at each layer.
2. **Work from both ends.** Decisions and information needs coming down, available data coming up, meeting at the one process you start with.
3. **A one-page data map.** A worked example for an invented process, labelled as illustrative: where each data item starts, who owns it, how often it updates and where it goes.

## Decisions (Nikita, 24 November 2026)

1. **Angle:** "Understand your data landscape first and build with the end goal in mind." "End goal" is read as a named decision with a measurable benefit (see Angle).
2. **Title:** *A Data-First Approach to Digital Transformation*. The URL stays `/insights/data-foundations/`.
3. **Harrison Spinks:** dropped (claim 18) to avoid a conflict of interest. Network Rail and Sheffield Forgemasters carry the success examples.
4. **Made Smarter:** the impact evaluation isn't discussed (claims 9 and 14 dropped), because the programme's approach may change. The article introduces the programme and its self-reported benefits (claim 54), then stresses quantified, measurable benefit: set a baseline and measure your own result.
5. **Nikita's experience:** Claude drafts these passages from the issue notes, and Nikita revises them. Passages he should review closely are marked in the draft with `{/* NIKITA: … */}` comments, which don't render on the page, and are listed in the PR.
6. **Low-risk hypothesis:** checked, and partly supported. The supported version is used in outline section 1a (see "Where data is trusted, and where it isn't").
