# Fact-check: industrial-ai

Date: 26 November 2026. Checked by a fresh subagent that did not write the draft.

Article checked: `src/content/articles/industrial-ai.mdx` (untracked working-tree file on branch `article/industrial-ai`), against `docs/content/articles/industrial-ai/brief.md`.

## Summary

135 factual claims checked. **101 supported (7 of them via reprint), 25 partly supported, 8 not supported, 1 source unreachable.** Three of the "not supported" rows are sentences with no source at all (rows 70, 95 and 129); the other five have a source that doesn't say what the article says.

Gartner (all four press releases) returned 403. Each Gartner figure was confirmed through search excerpts of Gartner's own release text and reputable reprints (ITPro, SD Times, The Register, CIO Dive), so they are marked supported "via reprint". Yokogawa's pages render empty to automated fetches; their content was confirmed through search excerpts and syndicated copies. The BridgeAI programme page timed out three times and is the one "source unreachable". Every PDF and spreadsheet behind a landing page (DSIT report and data tables, ONS BICS wave 165 workbook, DBT evaluation, Make UK report, Made Smarter toolkit, HVM Catapult report, MTC whitepapers, MIT NANDA copy, Kernan Freire paper) was downloaded and read in full.

The most serious problems, in order:

1. **"Cost came fourth (4%)" is wrong (row 75).** DSIT data table 63 shows that among businesses using AI, cost was the single biggest barrier for 5%, and it ranks sixth, behind knowledge (21%), skills (19%), data protection (12%), bias or accuracy (10%) and the business case (9%). The 4% is the all-business figure, where cost ranks lower still.
2. **"77% of the AI that businesses used ... was built on LLMs" misstates the base (row 16).** DSIT says 77% *of businesses using or planning to use AI* used LLM-based approaches. It's a share of businesses, not of AI.
3. **The opening and the gist say most UK manufacturers have met AI, or the chatbot (rows 5 and Gist).** The same ONS wave the article cites shows 76.1% of manufacturers use no AI at all. Only the ~20% who use AI have mostly met it through generative tools.
4. **The 55% against 35% shadow-AI comparison (row 124).** The 55% is from a Great Britain survey of individuals, not the UK, and ONS says outright that the employee and business measures aren't directly comparable. The article uses the gap as evidence that shadow AI is common.
5. **The cross-government Copilot trial didn't have "about 20,000 users self-report" (row 26).** About 20,000 licences were issued; 7,115 people answered the survey that produced the 26-minute figure.
6. **KTP's 67% isn't on the linked page (row 102).** The linked round page gives no grant rate. The UKRI grant-rates page does, and the 67% applies only to full-economic-cost projects (60% otherwise).
7. **Small distortions that add up:** "mostly US firms" for MIT NANDA isn't in the report (row 69); AnomalyDINO's 96.6% is an AUROC score, not a detection rate (row 25); BAE's "per part" isn't in the source (row 22); the red-teaming wasn't "run with" the UK AISI (row 50); GDS doesn't say to use conventional code for well-understood processes (row 55); Sculley et al. don't say models cost more to keep than to build (row 88); the ENEOS 40% steam saving is against the steam used for liquid-level control, not total steam use (row 47).
8. **Several factual sentences have no source, and several of Nikita's views aren't labelled as views (F2 to F14)**, the most visible being "A ban tends to push AI use out of sight" (F9) and "Nobody has measured a failure rate for industrial AI" (F5).

Prices and annual totals in the price table are all correct as of today.

## Claims

Verdict key: S = supported, P = partly supported, N = not supported, U = source unreachable. "Via reprint" means the publisher blocked automated access and the wording was confirmed in search excerpts of the release and in reputable reprints.

| # | Article section | Claim (short) | Source | Verdict | Where found / note |
|---|---|---|---|---|---|
| 1 | Opening | About 20% of UK manufacturers used some AI in autumn 2026 (our calculation) | ONS BICS wave 165 | S | Workbook (`bicswave1652final.xlsx`), sheet "AI Current Usage TS (WTD)", Manufacturing, wave 165 (survey live 21 September to 4 October 2026): 100 − 76.1 (no AI) − 3.7 (not sure) = 20.2%. Labelled as our calculation |
| 2 | Opening | Mostly to create images and text | Same | S | Same row: visual content 12.2%, text generation 10.3% |
| 3 | Opening, StatRow | 4.0% used machine learning on their data | Same | S | Same row: "Data processing using machine learning" 4.0% |
| 4 | Opening, StatRow | 61.1% of manufacturers using AI had trained no staff | Same | P | Sheet "AI Workforce Training TS (WTD)", 61.1% ✓. The base is businesses using AI **or not sure whether they do** (sheet header), not just users. See F31 |
| 5 | Opening | "Most UK manufacturers have met AI through that second door" | Same | N | Same wave: 76.1% of manufacturers don't use AI. Only the ~20% who do have mostly met it through generative tools. See F1 |
| 6 | What AI means | AI Playbook uses the OECD definition (machine-based system that infers outputs such as predictions, content, recommendations, decisions) | AI Playbook | S | "Understanding AI" section; Playbook published 10 February 2025 |
| 7 | What AI means | Family: ML learns from data; deep learning a more complex kind of ML; generative AI; LLMs behind chat assistants; agentic AI acts with little human involvement | Same | S | "Understanding AI". The Playbook puts LLMs under natural language processing; calling them "the generative AI behind chat assistants" is a fair gloss |
| 8 | What AI means | Deep learning "sits behind most computer vision" | Same | N | Not in the Playbook, which describes computer vision only as a field of AI and ML. See F2 |
| 9 | What AI means | ML still first choice for simpler tasks, as it needs less data and compute | Same | S | "Understanding AI": ML is described as the first-choice candidate for simpler tasks, easier with less data and lower computational power |
| 10 | What AI means | Agentic AI plans its own steps through tools that act on other systems | GDS, AI Insights: Agentic AI | S | Updated 3 August 2026. LLM reasoning chooses the course of action; registered tools reach APIs, databases and external systems |
| 11 | What AI means | Made Smarter: AI that can predict, sense, create or do | Made Smarter toolkit | S | Toolkit PDF p.8 (Predict, Sense, Create, Do). Not visible on the landing page itself, but the landing page is the right link |
| 12 | What AI means | Office AI quick to trial and easy to undo; AI on machines held up by trust and validation | Same | S | Toolkit PDF p.9 (IT AI against OT AI table) and p.12 (fast, reversible IT AI trials) |
| 13 | What AI means | Expects most small firms to start in the office | Same | S | Toolkit PDF p.9: most SMEs will begin with IT AI. The landing page says "many businesses" |
| 14 | What AI means | June 2026: 35% of UK businesses with 10+ staff used AI; 18% LLMs, 16% visual content, 12% ML on data | ONS, AI in UK businesses 2023 to 2026 | S | Released 20 July 2026; BICS wave 159, fieldwork June 2026; base 10+ employees |
| 15 | What AI means | Easy to see why AI and LLMs get used as one word (lead-in) | DSIT AI adoption survey 2026 | S | Editorial inference from row 16 |
| 16 | What AI means | 77% of the AI businesses used or planned to use was built on LLMs | Same | P | Report PDF p.7 (executive summary) and HTML executive summary: 77% **of businesses using or planning to use AI** used LLM-based approaches. A share of businesses, not of AI. See F15 |
| 17 | ML | NESO solar forecast 2.8 times more accurate up to two hours ahead; mean error 233 MW against 650 MW; built with Open Climate Fix using ML | NESO news | S | News item, 19 July 2024 |
| 18 | ML | In the control room since December 2022 | Same | S | First operational PV Nowcasting service delivered to the control room in December 2022 |
| 19 | ML | Project cost £500,000 of innovation funding | NESO project page | S | Project table: expenditure £500,000, funding mechanism NIA_RIIO-2, September 2021 to September 2025, close-down report January 2026 |
| 20 | ML | AMRC model trained on 62 milled blocks predicted errors to about 0.3 mm inside its range and couldn't generalise outside it | AMRC case study | S | Published 30 November 2024: 62 of 74 blocks used for training; ~0.3 mm only inside the training area; TRL 5 |
| 21 | Vision | Network Rail: image every 0.8 mm at up to 125 mph; replaced manual inspection on 8,500 miles by February 2019; experts confirm defects before local teams see them | Network Rail story | S | 11 February 2019. Experts in Derby confirm before track section managers receive defects |
| 22 | Vision | BAE: as few as 30 X-ray images **per part** to train on | Made Smarter BAE case study | P | 27 November 2024. A BAE senior engineer says they may have as few as 30 images to train AI; the system was trained on X-rays of welds. "Per part" isn't in the source. See F19 |
| 23 | Vision | Google recommends about 1,000 images per label | Google Cloud Vertex AI docs | S | "Prepare image training data": about 1,000 per label, minimum 10. No deprecation notice |
| 24 | Vision | MVTec AD trains on images of good parts only | MVTec AD dataset page | S | Each category has defect-free training images. Licence CC BY-NC-SA 4.0 (non-commercial) |
| 25 | Vision | AnomalyDINO reports 96.6% **detection** from a single good image per product | arXiv 2405.14529 | P | Abstract: one-shot image-level **AUROC** rose from 93.1% to 96.6%; training-free; WACV 2025. AUROC isn't a detection rate. See F20 |
| 26 | GenAI | Cross-government Copilot trial: about 20,000 users self-reported saving 26 minutes a day | GDS findings report | P | Published 2 June 2025. About 20,000 licences; 7,115 survey responses; 26 minutes is self-reported (section 4.2). "20,000 users self-reported" overstates the respondents. See F18 |
| 27 | GenAI | The trial had no control group | Same | P | The report doesn't mention a control or comparison group at all. True by absence, but the source doesn't state it. See F18 |
| 28 | GenAI | DBT: small time savings on written tasks, no evidence of improved productivity, some tasks took longer, hallucinations observed | DBT evaluation | S | Evaluation PDF p.5 (executive summary, "Time savings" and "Acceptable use and accuracy"). Landing page 28 August 2025 |
| 29 | GenAI | Hallucination: wrong, misleading or made-up output from patterns in training data rather than understanding | ICO glossary | S | Glossary entry "Hallucination" |
| 30 | GenAI | Current systems are often confidently wrong | AISI blog | S | 23 October 2025, "Reliability" section |
| 31 | GenAI | Detergent factory assistant: nine users liked faster access, preferred a nearby expert, raised safety concerns | Kernan Freire et al., arXiv 2401.05200 | S | Paper §4.1 (9 participants from a detergent factory: 4 managers, 5 operators), user-study themes "Safety" and "Traditional versus Novel", §6.2 |
| 32 | Agentic | NCSC: agentic systems use data sources, remember context, decide, use tools and act towards a goal without continuous human input | NCSC blog, 15 May 2026 | S | The blog says "intervention" rather than "input" |
| 33 | Agentic | Because they act, more useful and more hazardous than content-only tools | Same | S | Same blog |
| 34 | Agentic | Anthropic: workflows follow coded steps, agents choose their own; start simplest because agents cost more and are slower | Anthropic, Building effective agents | S | 19 December 2024. Agentic systems often trade latency and cost for performance |
| 35 | Agentic callout | Gartner: only about 130 of thousands of agentic vendors are real; "agent washing" | Gartner, 25 June 2025 | S (via reprint) | 403. Release text confirmed in search excerpts and in ITPro and SD Times coverage |
| 36 | Agentic callout | Yokogawa calls its reinforcement-learning controllers "AI agents" | Yokogawa press release, 29 October 2025 | S (via reprint) | Page body empty on fetch. Search excerpts of the release and its Business Wire/Nasdaq copies describe "autonomous control AI agents" running FKDPP, a reinforcement-learning algorithm |
| 37 | Agentic, StatRow | 2% of UK businesses used agentic AI in 2026 | DSIT AI adoption survey 2026 | S | Report PDF Figure 4, p.25 to 26. Base: all businesses with 5+ employees; "using" includes piloting |
| 38 | Agentic | A third of those were still piloting | Same | S | Report Figure 8, p.31 to 32: 33% currently piloting; unweighted base 88 |
| 39 | Agentic, StatRow | Capgemini survey of 1,500 large organisations: 2% had scaled agents | Capgemini press release | S | 16 July 2025. 1,500 executives at organisations with over US$1bn revenue in 14 countries; fieldwork April 2025; 2% fully scaled |
| 40 | Agentic | Trust in fully autonomous agents fell from 43% to 27% in a year | Same | S | Same release |
| 41 | Agentic | AI agents at the peak of inflated expectations on Gartner's 2025 hype cycle | Gartner, 5 August 2025 | S (via reprint) | 403. Release text in search excerpts: AI agents and AI-ready data are the fastest-advancing technologies, placed at the peak |
| 42 | Agentic StatRow | 15% of IT leaders considering or using fully autonomous agents | Gartner, 30 September 2025 | S (via reprint) | 403. Confirmed by The Register, CIO Dive, IT Brief: survey of 360 IT **application** leaders; 15% considering, piloting or deploying |
| 43 | Agentic | Aker BP: LLM agents gathering information and suggesting analysis steps cut root-cause analysis time by over 70%, no baseline | Aker BP page | S | Undated page (likely September 2025). No baseline, sample or method given |
| 44 | Agentic | GE Appliances runs more than 800 agents, many built by its own staff | Google Cloud press release; engineering.com | S | Release 22 April 2026: 800+ agents. engineering.com (28 May 2026) quotes Google Cloud on "hundreds" of citizen-built agents |
| 45 | Agentic | Supplier agent cut backorders by 25%, no baseline | Google Cloud press release | S | No baseline or period given |
| 46 | Agentic | People review outputs because agents can drift and make mistakes | engineering.com | S | Article says outputs are reviewed by humans and monitored for drift; a GE Appliances VP says agents can drift and make mistakes |
| 47 | Agentic | Yokogawa controller ran an ENEOS Materials distillation column for 35 days and cut steam use by 40% | Yokogawa success story | P | The cited page renders empty to fetches. Yokogawa's 30 March 2023 release (search excerpts) and Chemical Processing confirm 35 days (17 January to 21 February 2022). The 40% is against the steam previously used to hold the liquid level under manual control (release footnote), not total steam use. See F27 |
| 48 | Agentic | Project Vend: shop agent lost money, sold below cost, invented a payment account | Anthropic | S | 27 June 2025. Ran about a month; told customers to pay an account it made up |
| 49 | Agentic | July 2025 coding agent deleted a live database during a code freeze, against instructions | AI Incident Database #1152 | S | Incident 18 July 2025 (Replit, SaaStr). AIID notes these are reported allegations |
| 50 | Agentic | Red-teaming "run with the UK AI Security Institute": attacks succeeded against agents on all 13 frontier models | NIST CAISI blog | P | 23 March 2026. Competition **hosted by Gray Swan**; CAISI partnered with Gray Swan, UK AISI and labs on the analysis. 250,000+ attempts; at least one successful attack against all 13 models. See F21 |
| 51 | Agentic | LLM-driven inspection robot consistent only 65% of the time; recommended a person approve every command | HVM Catapult and NPL report | S | PDF p.8 (printed p.13), MTC case: consistency 65%, functional 88%; recommendation that all commands be supervised or approved by an operator until reliability improves |
| 52 | Agentic | NCSC: prompt injection may never be fully fixed; keep agents reading untrusted content from powerful tools | NCSC blog, 8 December 2025 | S | Says prompt injection may never be totally mitigated; an LLM processing outside emails shouldn't have privileged tools |
| 53 | Agentic | "The NCSC and its Five Eyes partners" advise starting small with well-understood, low-risk tasks, and asking whether simpler automation would do | NCSC blog, 15 May 2026 | P | Advice ✓ in the blog. The blog says "international partners" and doesn't name Five Eyes; the six Five Eyes agencies are named on the NCSC-NZ and ACSC pages for the joint guidance (1 May 2026), which the article doesn't link. See F22 |
| 54 | Agentic | Least access for the shortest time; name who owns, watches and can stop it before it touches a real system | Same | S | Blog: responsibilities to be defined before the agent is connected to real systems or data |
| 55 | Agentic | GDS advice: where a process is well understood, use fixed steps or conventional code | GDS AI Insights | P | GDS says an agent needn't derive what is already well known and sets a fixed order for those steps; it never recommends conventional code over agents. See F23 |
| 56 | Agentic | Pull quote: not ready for deployment if you can't understand, monitor or contain it | NCSC blog | S | Verbatim match |
| 57 | Cheaper to build | Cost of running a GPT-3.5-level model fell more than 280-fold, November 2022 to October 2024 | Stanford AI Index 2025 in 10 charts | S | US$20 to US$0.07 per million tokens |
| 58 | Cheaper to build | Defect detection that once needed thousands of labelled images can now start from a handful of good ones | (none in paragraph) | P | Supported only as a benchmark result (rows 23 and 25), and no link in this paragraph. See F3 |
| 59 | Cheaper to build | Cost of adopting AI is mostly time and effort, not the tool price | DSIT report | S | Report PDF p.51 (summary bullet on financial barriers) and p.53 |
| 60 | Cheaper to build | One firm reckoned a new technology took a quarter to a fifth of **someone's** time for six months | Same | P | p.53 interview quote: a mid-sized business said it took a quarter to a fifth of **"our time"** (the organisation's), not one person's. See F17 |
| 61 | Cheaper to build | Among manufacturers using AI, 7.2% used it extensively | ONS BICS wave 165 | S | Sheet "AI Extent Use TS (WTD)". Base includes "not sure" (F31) |
| 62 | Cheaper to build | 60.1% adopted it through free software | Same | S | Sheet "AI How Adopted TS (WTD)", multi-select. Same base note |
| 63 | Cheaper to build | Make UK: business support 83%, production 11%, quality control 6% | Make UK report | S | Report PDF p.8, Chart 2 |
| 64 | Why stall callout | RAND didn't measure "80% fail"; it repeats an outside estimate from a 2022 magazine article | RAND RR-A2680-1 | S | 13 August 2024. "By some estimates", attributed to a 2022 *Fortune* article |
| 65 | Why stall callout | Gartner's 2024 abandoned-GenAI figure is a forecast | Gartner, 29 July 2024 | S (via reprint) | 403. Release text in excerpts and reprints (Computer Weekly, TechRepublic): "at least 30%" by end of 2025 |
| 66 | Why stall callout | Gartner's 2025 cancelled-agentic figure is a forecast drawn partly from a webinar poll | Gartner, 25 June 2025 | S (via reprint) | 403. Poll of 3,412 webinar attendees (January 2025) |
| 67 | Why stall callout | NANDA's 95%: preliminary study built on interviews and a conference survey; authors call it directionally accurate | MIT NANDA, third-party copy | S | PDF p.2 ("Preliminary Findings"; 52 interviews, 153 survey responses at four conferences, plus review of 300+ public initiatives); p.3 (95% zero return); p.6 ("directionally accurate", said of the pilot-to-production figures) |
| 68 | Why stall callout | NANDA studied "mostly US firms" | Same | N | The report states no geography; p.24 only warns its sample may not represent all regions. See F24 |
| 69 | Why stall callout | About a quarter of piloted custom tools reached production | Same | S | [D] p.3 and p.6: 20% reached pilot, 5% production; 5/20 = 25% |
| 70 | Why stall callout | Nobody has measured a failure rate for industrial AI | (none) | N | Absolute claim with no source. The brief says to write "we could not find". See F5 |
| 71 | Why stall | RAND: 65 data scientists and engineers, five root causes | RAND | S | Summary: 50 industry and 15 academic interviewees; five root causes as listed |
| 72 | Why stall | MTC review of more than 40 AI standards found guidance thinnest at scoping | MTC Trustworthy AI Framework | P | PDF p.17: 40+ **publications** (standards, frameworks, policies and white papers); scoping **and retirement** both poorly covered; many issues stem from poor scoping. See F25 |
| 73 | Why stall | Single biggest barrier for AI users: not knowing how AI could help (21%) | DSIT report and data tables | S | Report p.53; data table 63, "Using" column: 21% |
| 74 | Why stall | Cost came fourth (4%) | Same | N | Data table 63, "Using" column: cost 5%, ranked sixth. 4% is the all-business total, where cost ranks about eighth. See F16 |
| 75 | Why stall | Firms not using AI said the same | Same | P | p.53: non-users put the business case and not knowing how AI could help joint first (21% each). See F38 |
| 76 | Why stall, BarChart | What would make non-adopters adopt: 62, 61, 50, 50, 46, 45, 41, 35 | Same | S | Report Figure 23, p.57 to 58; data table 64. All eight values correct. Omits "clearer regulation" (50%) and "customer demand" (40%). See F39 |
| 77 | Why stall, BarChart | Base 2,041 non-adopters | Same | S | Data table 64: unweighted 2,041. The report's Figure 23 note says 2,043. Either is defensible; say "unweighted" |
| 78 | Why stall | 71% reported improved productivity; 64% saw no change in operating costs | Same | S | Figure 19 (p.46 to 47) and Figure 20 (p.48). Base: businesses using AI, unweighted 1,224 |
| 79 | Why stall | 30,000+ US plants: predictive analytics raised productivity only alongside IT, skilled people or a suitable process | Brynjolfsson, Jin and McElheran | S | Abstract (working paper, 29 June 2021) |
| 80 | Why stall | "Data ranks behind leadership and the business case in these studies" | (none in sentence) | P | Roughly consistent with RAND (data second of five) and DSIT ("better data" 41% against business case 61%), but no link and "these studies" is loose. See F6 |
| 81 | Where to start | Made Smarter: start from tasks, problems and outcomes, not AI as a technology | Made Smarter toolkit | S | Landing page foreword; toolkit PDF p.3 |
| 82 | Where to start | Rank by value and feasibility; feasibility = data exists, workflow stable, risk manageable, trial without disruption | Same | S | Toolkit PDF p.13 |
| 83 | Where to start | Pilot with clear success measures and human oversight; shop-floor pilots alongside existing process; then scale | Same | S | Landing page (Pilot stage); toolkit PDF p.14 (testing alongside existing processes) |
| 84 | Where to start | AI Champion's plan proposes "Scan, Pilot, Scale"; services still proposals | AI Adoption Plan: Advanced Manufacturing | S | Updated 16 November 2026; independent report by the AI Champion. Front door and SME fast-track use conditional wording |
| 85 | Where to start | Google: don't be afraid to launch without ML; move to ML when rules get too complex | Rules of Machine Learning | S | Rules #1 and #3 |
| 86 | Where to start | Playbook agrees, and asks for a plan to maintain, monitor and retire | AI Playbook | S | Principle 6 (established technologies may solve it more easily); Principle 5 (maintenance, drift monitoring, secure close-down) |
| 87 | Where to start | Models cost more to keep than to build, because the world changes | Sculley et al., 2015 | P | Abstract: massive ongoing maintenance costs are common; changes in the external world is one risk factor. No comparison with build cost. See F26 |
| 88 | Costs | Microsoft 365 Copilot Business £16.10; first-year offer £13.80 to 31 December 2026 | Microsoft UK pricing | S | Checked 26 November 2026: £16.10 user/month paid yearly, ex VAT, add-on; promotion available 1 July to 31 December 2026 for existing Business-plan customers, first year only |
| 89 | Costs | ChatGPT Business standard seat US$20 | OpenAI help | S | US$20 billed annually, US$25 monthly. OpenAI notes prices vary by country and currency |
| 90 | Costs | Claude Team standard seat US$20 | claude.com/pricing | S | US$20 annual, US$25 monthly; 2 to 150 seats; no GBP |
| 91 | Costs | Google Workspace Business Standard £11.80 (Gemini included) | Google Workspace UK pricing | S | £11.80 user/month on the one-year commitment, excluding tax; Gemini included. The UK page now labels the plan "Standard". See Price table |
| 92 | Costs | All four vendors say business-plan prompts aren't used for training by default | OpenAI only linked | P | True of all four (Microsoft Learn EDP page; Google Workspace privacy hub; claude.com pricing; OpenAI help), but only OpenAI is linked in the paragraph. See F8 |
| 93 | Costs | Consumer ChatGPT may use chats for training unless turned off | OpenAI help 5722486 | S | Opt-out via Data controls; feedback can still be used |
| 94 | Costs | 47% of AI users able to estimate spending spent nothing in 2025; average about £7,500 | DSIT report | P | p.43: base is businesses **using or planning to use** AI that gave an estimate. Among current users, 43% spent nothing and the mean was £8,000. See F30 |
| 95 | Costs | Pass/fail tags take seconds; marking every defect takes far longer | (none) | N | No source. See F7 |
| 96 | Skills | Over half of Make UK members name skills shortages as the main obstacle to moving AI beyond small trials | Make UK | S | Landing page (8 June 2026); report PDF p.11 words it as the main constraint on using AI effectively |
| 97 | Skills | 88% of UK businesses rely on on-the-job training to build AI skills | DSIT AI labour market survey | P | Executive summary (28 January 2026): 88% of **organisations surveyed** use on-the-job training instead of structured programmes; survey run by Gardiner & Theobald for DSIT. See F34 |
| 98 | Skills | AI Skills Hub offers free short courses to any UK adult | DSIT press release | S | 28 January 2026 |
| 99 | Skills | Smaller employer pays 5% for an apprentice aged 25+, nothing for 16 to 24 | Apprenticeship funding guide from August 2026 | S | Co-investment waived for 16 to 24 year olds for starts from 1 August 2026 |
| 100 | Skills | ML engineer apprenticeship up to £22,000; smaller employer's share £1,100 plus wages | Apprenticeship course 795 | S | Level 6, 24 months, £22,000 cap. £1,100 is right only for an apprentice aged 25+. See F36 |
| 101 | Skills | KTP grants cover 67% of an SME's project costs | UKRI KTP round 4 page | N | The linked page gives no rate. UKRI's KTP grant-rates page gives 67% for SMEs on full-economic-cost projects, 60% otherwise. See F10 |
| 102 | Funding | Made Smarter Adoption: SMEs in England; funded advice; match-funded grants up to £20,000 in several regions | Made Smarter Adoption | S | Programme page; support varies by region |
| 103 | Funding | BridgeAI funds projects pairing a firm that makes an AI product with a business that deploys it | IUK Business Connect BridgeAI page | U | Timed out three times. UKRI's Deployment Catalyst listing (search excerpts) is consistent: an AI SME leads with a deployer organisation |
| 104 | Trust | Siemens plant randomised experiment: heatmap users more accurate, caught more wrong calls, overruled fewer right ones, no loss of speed | Senoner et al. | S | *Scientific Reports*, December 2024 (PMC11681242), Study 1 results; no significant difference in decision time |
| 105 | Trust, StatRow | 48 workers; 88.6% accuracy with score alone, 96.3% with heatmap | Same | P | 48 after exclusions ✓, randomised ✓. 88.6% and 96.3% are **balanced** accuracy. See F29 |
| 106 | Trust, StatRow | 96.9% of wrong AI calls caught with heatmap against 86.4% without | Same | S | Study 1 results |
| 107 | Trust | NPL: test against known cases before go-live, checks scaled to harm, repeated afterwards | NPL news, 16 March 2026 | P | Risk-based assurance by purpose and consequence ✓; continuous assurance across the lifecycle ✓; "testing against known cases before go-live" isn't there. See F32 |
| 108 | Trust | After independent tests on six industrial AI systems, HVM Catapult and NPL concluded deployment is held back by lack of confidence, not ambition | HVM Catapult report | S | Contents list: six case studies (AMRC, CPI, MTC, NMIS, NCC, WMG); conclusion p.27 printed |
| 109 | Sign-off | AQuA Book: commissioner, analyst, independent assurer, approver; depth by criticality, novelty, complexity; covers AI | AQuA Book | S | 2025 edition (30 July 2025), §5.1 and Chapter 3 (Table 3-1); black-box and AI sections added in 2025 |
| 110 | Sign-off | Playbook: a person should validate any high-risk decision AI influences | AI Playbook | S | Principle 4 |
| 111 | Sign-off | 81% of AI users check at least some outputs; 5% check none | DSIT report | S | Figure 27, p.72 to 73: 81% apply at least some human input or checking (down from 84%); 5% none (up from 2%) |
| 112 | Law | No UK AI Act | IAPP | S | 14 May 2026: no AI bill in the 13 May 2026 King's Speech. Professional-body news, not a primary |
| 113 | Law | Regulators apply five principles | DSIT government response | P | 6 February 2024. The first principle is "safety, security and robustness"; the article drops "security". See F35 |
| 114 | Law | HSE: law applies whatever the technology; assess and control AI risks, cyber included | HSE statement | S | 12 June 2026 |
| 115 | Law | Significant decisions about people: data protection law applies | ICO DUAA page | S | Updated 19 June 2026: DUAA widens lawful bases for significant automated decisions with safeguards. Rostering and performance are our examples |
| 116 | Law | EU AI Act rules for AI in machinery apply from 2 August 2028 | artificialintelligenceact.eu | S | Regulation (EU) 2026/1744, in force 27 July 2026: Annex I (products) from 2 August 2028. The site is run by the Future of Life Institute, not the EU. See File links F-L3 |
| 117 | Governance | Government dropped AI Management Essentials in February 2026, promising simpler SME guidance with no date | DSIT response | S | Updated 6 February 2026 |
| 118 | Governance | MTC governance core: team reviews each use case before start and at intervals; validated use case; minimum data, sensitivity checked; human review; live risk register from business-wide to use case; usage policy | MTC AI Governance | S | Whitepaper (20 November 2023, research to September 2023) PDF p.7 (governance team), p.16 (recommendations 1 to 3, 5, 9, 10), p.17 (three nested risk tiers, live register), p.23 (review gate before setup, reviews at intervals). "Small" team is our word |
| 119 | Governance | NCSC board questions start with who is accountable | NCSC guidance | S | First question in "Questions to ask...". Published 13 February 2024, modified 31 July 2026 |
| 120 | Governance | AI Cyber Security Code of Practice is free and covers security | GOV.UK | S | Published 31 January 2025; free to read |
| 121 | Governance | ISO/IEC 42001 is a paid, certifiable AI management system standard | BSI press release | S | 21 October 2026, 50th certificate. Price shown on the BSI shop, not in the release |
| 122 | Shadow AI | Shadow AI is unapproved AI use; NCSC treats it as shadow IT | NCSC blog | S | 7 September 2026 |
| 123 | Shadow AI | 55% of UK employees use AI for work or study, while 35% of businesses report using AI | ONS AI in UK businesses | P | 55% is from the Opinions and Lifestyle Survey of **Great Britain**; ONS says the two measures aren't directly comparable. See F28 |
| 124 | Shadow AI, StatRow | 71% of UK employees had used unapproved consumer AI tools at work | Microsoft UK Stories | S | 13 October 2025; Censuswide for Microsoft, 2,003 UK employees. Labelled vendor ✓ |
| 125 | Shadow AI, StatRow | 31% of UK GenAI users use it without their employer knowing | Deloitte | S | GenAI Workforce Survey 2026, May to June 2026; weighted base 13,798 |
| 126 | Shadow AI, StatRow | 88% of staff with an enterprise AI tool also use personal ones | Gartner, 13 May 2026 | S (via reprint) | 403. Q1 2026 survey of 12,004 employees and managers in 40 countries; Gartner says "personal" |
| 127 | Shadow AI | Netskope: personal-account share fell from 78% to 47% in a year | Netskope Cloud and Threat Report 2026 | S | Managed accounts 25% to 62% |
| 128 | Shadow AI | Harmonic: 26% of uploaded files sensitive; 12% of exposures via personal accounts | Harmonic Security | S | 26.38% and 11.84%; Q3 2025; US and UK; browser data only |
| 129 | Shadow AI callout | A ban tends to push AI use out of sight | (none) | N | Not in the NCSC blog. See F9 |
| 130 | Shadow AI callout | NCSC: find out why, offer secure alternatives, make it easy to raise concerns | NCSC blog | P | Understanding reasons and providing secure alternatives ✓; the blog says "encouraging open communication about cyber security issues", not "making it easy to raise concerns". See F37 |
| 131 | Shadow AI callout | Acas: clear policy, check outputs, IT-approved tools, sensitive data out of public tools | Acas | S | 28 April 2025 |
| 132 | People | Government estimates about 70% of UK workers are in jobs AI could do or support; no evidence yet of job losses; nothing on manufacturing | DSIT and AISI assessment | P | 28 January 2026. 70% is the **IMF's** estimate, cited by the government. Job-loss and manufacturing points ✓. See F33 |
| 133 | People | 71.3% of manufacturers using AI reported no change in headcount | ONS BICS wave 165 | S | Sheet "AI Impact on Headcount TS (WTD)". Base includes "not sure" |
| 134 | People | Make UK: of those where AI changed work organisation, 86% automated tasks, none redesigned roles | Make UK report | S | PDF p.9, Charts 3 and 4 (17% report an impact) |
| 135 | People | Acas: 26% of GB employees' biggest worry is job losses; consult staff before introducing AI | Acas | S | YouGov, 1,023 GB employees, 27 March to 1 April 2025 |

## Unsourced sentences

Factual sentences with no source link in the same paragraph, or whose link doesn't support them.

- **F1 (row 5).** Opening paragraph 2: "Most UK manufacturers have met AI through that second door." Wave 165 shows 76% use no AI. Rewrite as "UK manufacturers that use AI have mostly met it through that second door", then keep the figures.
- **F2 (row 8).** "Deep learning ... and sits behind most computer vision." Not in the Playbook. Cut "and sits behind most computer vision", or source it separately.
- **F3 (row 58).** "defect detection that once needed thousands of labelled images can now start from a handful of good ones." No link, and it drops the benchmark caveat the vision section was careful to give. Link MVTec AD and AnomalyDINO again and soften: "on benchmarks, defect detection can now start from a handful of good images".
- **F4.** "With good data and a well-chosen use case, you no longer need a large data science team." This, and the paragraph's first sentence, is Nikita's view. Label it ("In our experience..."), as decision 7 asks.
- **F5 (row 70).** "Nobody has measured a failure rate for industrial AI." Replace with "We could not find a measured failure rate for industrial AI."
- **F6 (row 80).** "Data ranks behind leadership and the business case in these studies". No link, and "these studies" is vague. Either cite RAND (data is the second of five root causes) and DSIT (better data 41% against business case 61%), or cut the clause and keep "untrusted or siloed data still stalls AI".
- **F7 (row 95).** "a pass or fail tag takes seconds, where marking out every defect by hand takes far longer." No source. Label as our view ("In our experience...") or find a labelling-effort source.
- **F8 (row 92).** "All four vendors say prompts on their business plans aren't used to train their models by default". Only OpenAI is linked. Add, in the same paragraph: Microsoft (https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection, which now redirects to `/copilot/plan/enterprise-data-protection`), Anthropic (https://claude.com/pricing lists "no model training on your content by default" for Team, or https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training) and Google (https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub). All three were checked today and support the claim.
- **F9 (row 129).** "A ban tends to push AI use out of sight." The NCSC blog doesn't say it. Either cut it or label it: "In our view, a ban tends to push AI use out of sight." (Gartner's 13 May 2026 release reportedly advises improving enterprise tools rather than cracking down, but it can't be opened, so don't lean on it.)
- **F10 (row 101).** "grants cover 67% of an SME's project costs". The linked round page gives no rate. Add https://www.ukri.org/councils/innovate-uk/guidance-for-applicants/costs-we-fund/costs-guidance-for-knowledge-transfer-partnerships/grant-rates/ and write "67% for most SME projects" (it's 60% for non-full-economic-cost projects).
- **F11.** "The technology changes quickly, but risk assessment, the NCSC's board questions and clear sign-off stay the same when a new model ships." The brief (claim 93) says to label this as ours. Add "In our view".
- **F12.** "ISO/IEC 42001 ... mainly worth it when customers ask for it." Opinion. Add "in our view".
- **F13.** Opening paragraph 1 ("Five years ago ... a small subscription buys tools that once needed a dedicated team") is unsourced framing. It's Nikita's view per the brief; acceptable as an intro, but consider "In our experience" on the last sentence.
- **F14.** "Generative AI and pre-trained models have cut the effort, cost and skills needed to build AI." Partly backed by the Stanford link that follows, but "skills" and "effort" aren't. Label as our view or narrow to cost.

Sentences whose link doesn't fully support them:

- **F15 (row 16).** Change to: "In the government's 2026 survey, 77% of businesses using or planning to use AI used tools built on LLMs".
- **F16 (row 74).** Change "and cost came fourth (4%)" to "and only 5% named cost". Don't give a rank, or say "sixth".
- **F17 (row 60).** Change "a quarter to a fifth of someone's time" to "a quarter to a fifth of a small team's time over six months" (the interviewee said "our time").
- **F18 (rows 26, 27).** Change to: "In the cross-government Microsoft 365 Copilot trial, which issued about 20,000 licences, the 7,115 people who answered the survey self-reported saving 26 minutes a day on average. The report describes no control group."
- **F19 (row 22).** Drop "per part": "may have as few as 30 X-ray images to train on".
- **F20 (row 25).** "reports 96.6% detection on it" should be "reports an AUROC score of 96.6% on it" (or "a score of 96.6% on the benchmark's standard measure"). AUROC isn't the share of defects detected.
- **F21 (row 50).** Change "In red-teaming run with the UK AI Security Institute" to "In a public red-teaming competition, analysed by the US and UK AI security institutes,". Keep "attacks succeeded at least once against agents on every one of the 13 frontier models tested".
- **F22 (row 53).** "The NCSC and its Five Eyes partners". The linked NCSC blog says "international partners". Either say that, or add a link to the joint guidance page that lists the agencies (for example the NCSC-NZ page, https://www.ncsc.govt.nz/protect-your-organisation/careful-adoption-of-agentic-ai-services/).
- **F23 (row 55).** Change "Where a process is already well understood, the government's advice is to use fixed steps or conventional code" to "Where steps are already well known, the government's advice is not to leave an agent to work them out, but to fix their order".
- **F24 (row 68).** Delete "of mostly US firms".
- **F25 (row 72).** "more than 40 AI standards" should be "more than 40 AI standards, frameworks and policy papers". Add "and at the end, retiring the system" if space allows. Same fix in Further reading ("A review of more than 40 AI standards").
- **F26 (row 87).** Change "Models cost more to keep than to build" to "Machine learning systems carry large ongoing maintenance costs". Change Further reading's "Why a model costs more to keep than to build" to "Why machine learning systems are costly to maintain".
- **F27 (row 47).** "cut steam use by 40%" should be "cut the steam used to control the column by 40% against manual control" (Yokogawa's footnote). The cited success-story page doesn't render for automated readers; consider linking Yokogawa's 30 March 2023 release (https://www.yokogawa.com/uk/news/press-releases/2023/2023-03-30/), which carries the 35 days and the 40% with its footnote. Check in a browser first.
- **F28 (row 123).** Change to: "55% of workers in Great Britain say they use AI for work or study, while 35% of businesses with ten or more staff report using AI. ONS warns the two aren't directly comparable, but the gap fits staff using tools their employer hasn't adopted." Or drop the comparison and lead with the Microsoft and Deloitte figures.
- **F29 (row 105).** StatRow labels: "worker accuracy" should be "balanced accuracy" (both 88.6% and 96.3%).
- **F30 (rows 37, 94, 111).** DSIT bases. Row 94: "Among businesses using or planning to use AI that could estimate their spending, 47% spent nothing" (or use 43% of current users, mean £8,000). Row 111: "81% of UK AI users apply at least some human checking to AI outputs". Row 37: optionally add "with five or more staff".
- **F31 (rows 4, 61, 62, 133).** ONS wave 165 bases include firms not sure whether they use AI. Write "Among manufacturers using AI or unsure whether they do" once, or add a footnote.
- **F32 (row 107).** Change "testing against known cases before go-live, with checks scaled to the possible harm and repeated afterwards" to "assurance scaled to the possible harm, done before adoption and continued afterwards". "Known cases" isn't in NPL.
- **F33 (row 132).** "The government estimates" should be "The government, citing IMF estimates, says".
- **F34 (row 97).** "88% of UK businesses rely on on-the-job training" should be "88% of organisations in a government-commissioned survey rely on on-the-job training rather than structured courses".
- **F35 (row 113).** "safety and robustness" should be "safety, security and robustness".
- **F36 (row 100).** "a smaller employer's share is £1,100 plus wages" should be "a smaller employer's share is £1,100 for an apprentice aged 25 or over, plus wages".
- **F37 (row 130).** "making it easy to raise concerns" should be "encouraging open communication about security concerns".
- **F38 (row 75).** "Firms not using it said the same." should be "Firms not using AI put not knowing how it could help joint first, level with the lack of a business case (21% each)."
- **F39 (row 76).** The bar chart omits "clearer regulation or legal frameworks" (50%, level with peers and trust) and "customer demand" (40%). Add them, or change the title to "...: selected answers". Add "unweighted" to the base note.

## Tools and resources

- **T1. OECD SME AI Readiness Tool.** The page labels itself a pilot version for testing, with content subject to change (preliminary G7 validation as of May 2026). Add "Pilot; free."
- **T2. AI Skills Hub.** The government says the foundation courses are free, but press and opinion pieces (FE Week, Computer Weekly) report that around 60% of listed courses charge a fee. The hub itself returned 403. "Some Skills Hub listings are paid" understates it: write "free foundation courses; many other Skills Hub listings are paid".
- **T3. OpenLearn, AI Matters.** The URL opens "An introduction to artificial intelligence", a free six-hour course in the OpenLearn AI Hub (updated 4 March 2026). Rename the link text to match.
- **T4. ISO/IEC 42001 (BSI).** The linked product is BS ISO/IEC 42001:2023. The page says BS EN ISO/IEC 42001:2026 supersedes it (no technical changes). Link the current 2026 edition. "Paid" is correct.
- **T5. Digital Catapult AI Adoption Toolkit.** Live, with four assessments (digital maturity, data maturity, data readiness, MLOps maturity) built for BridgeAI. The page doesn't say it's for SMEs or that it's free. Change "for UK SMEs" to "for UK organisations", and confirm "Free" by opening an assessment.
- **T6. Knowledge Transfer Partnerships.** The linked page is one funding round (open 19 October 2026 to 27 January 2027). It doesn't describe the graduate-and-university model. It will go stale, against decision 5. Link a stable KTP page instead, for example the UKRI grant-rates page in F10 or Innovate UK's KTP programme page.
- **T7. AI Cyber Security Code of Practice.** The landing page targets organisations that develop and deploy AI. "For anyone running or using AI" is a little broad; "for organisations that build or run AI systems" is safer.
- **T8.** These are fine as described, current and free: Made Smarter toolkit; Made Smarter Adoption; the three NCSC pages; HSE statement (12 June 2026); AQuA Book (2025 edition); ICO risk toolkit (the page says it's under review after the DUAA ✓); Elements of AI (free courses; it also sells separate paid training, which doesn't affect the free courses).

## File links

- **L1. HVM Catapult and NPL, Trustworthy AI adoption** (body twice, Further reading once) links straight to `Trustworthy-AI-adoption.pdf`. No landing page for the report itself was found. HVM Catapult's reports hub (https://hvm.catapult.org.uk/resource-hub/reports/) lists it and is the closest landing page. Either link the hub, or keep the PDF and mark it "(PDF)".
- **L2. MIT NANDA, The GenAI Divide** links to a third-party PDF (mlq.ai). No MIT-hosted landing page found (searched). It's disclosed in the text as required by decision 6. Add "(PDF)".
- **L3. EU AI Act** links to artificialintelligenceact.eu, a third-party site run by the Future of Life Institute, not a file. The brief already says to swap it for EUR-Lex. The regulation is Regulation (EU) 2026/1744; the likely address is https://eur-lex.europa.eu/eli/reg/2026/1744/oj, but it returned an empty page to the fetch tool, so check it in a browser before swapping.
- **L4.** Landing pages used correctly: ONS BICS wave 165 (dataset page, not the xlsx), DSIT AI adoption survey, DBT evaluation, Make UK, Made Smarter toolkit, both MTC whitepapers, NESO, RAND, arXiv abstracts, NeurIPS abstract.

## Costs, limitations and when not to bother

- **C1. Costs: covered.** "What it costs, and the skills it needs" gives seat prices, DSIT's actual spend (47% nothing, mean about £7,500) and the point that staff time is the main cost. Apprenticeship and KTP costs are there too. There's no cost range for a shop-floor vision or ML deployment, but no sourced figure exists, so saying the cost is mostly people's time is the honest position.
- **C2. Limitations: covered.** Each level has its failure mode (AMRC generalisation, rare defects and the benchmark caveat, hallucination and DBT's productivity finding, agent failures and red-teaming). "Why AI projects stall" covers the rest.
- **C3. When not to bother: covered.** The five-bullet list in "Where to start, and when not to bother", plus Google's rules and the Playbook. The agentic section ends with a clear "not on plant or safety systems".
- No fix needed.

## Gist

- **G1. "Most UK manufacturers have only met the chatbot" isn't supported.** Most UK manufacturers (76%) haven't met AI at all. Suggest: "Few UK manufacturers use AI yet, and most that do have only met the chatbot".
- **G2. "the measured UK results come from the older kinds"** is slightly too strong: the government Copilot trials did measure (self-reported) time savings. Suggest "the UK results with published baselines come from the older kinds", which matches the body's "clearest UK example with a published baseline".
- **G3. Verdict matches the body.** Start from a measurable decision, pick the simplest AI, test before trusting: this is the body's conclusion, stated in the introduction, "Where to start" and "Trust".

## Price table

All checked on the vendors' official pages today (26 November 2026).

| Tool | Article | Official page today | Annual totals |
|---|---|---|---|
| Microsoft 365 Copilot Business | £16.10, offer £13.80 to 31 December 2026 | £16.10 user/month paid yearly, ex VAT, add-on to a Business plan; £13.80 first-year promotion available 1 July to 31 December 2026 to existing Business-plan customers. Monthly billing £19.32 | £193.20 × 10/25/50/100 = £1,932 / £4,830 / £9,660 / £19,320 ✓ |
| ChatGPT Business, standard | US$20 | US$20 annual, US$25 monthly; OpenAI says prices vary by country and currency | US$240 × n = 2,400 / 6,000 / 12,000 / 24,000 ✓ |
| Claude Team, standard | US$20 | US$20 annual, US$25 monthly; 2 to 150 seats; no GBP | Same ✓ |
| Google Workspace Business Standard | £11.80 | £11.80 user/month on one-year commitment, excluding tax; Gemini included | £141.60 × n = £1,416 / £3,540 / £7,080 / £14,160 ✓ |

- **P1.** All prices and totals are correct.
- **P2.** Google's UK page now labels the plan "Standard" rather than "Business Standard". Check the name in a browser and match it.
- **P3.** Google shows an introductory £5.90 for 10 December 2026 to 10 March 2027. That's after publication, so no change now, but recheck if the article is reviewed during that window.
- **P4.** OpenAI says its prices vary by country and currency, so UK customers may be billed in pounds at a different figure. Consider adding "US list price" to the two US$ rows, or a line under the table.
- **P5.** Microsoft's £13.80 offer is limited to existing customers with an eligible Business plan. The caption could say "for existing Microsoft 365 Business customers".

## AI-sounding passages

Most sections open with a short declarative sentence and several end on a neat closer. Each is fine alone; together they read as a pattern. Suggested fixes:

- **A1. Staged contrasts.** "AI isn't the same thing as ChatGPT." (opener); heading "Cheaper to build, not cheaper to get right"; "The causes are clearer than the rate."; "The failures are better documented than the successes."; "UK firms put understanding ahead of money." Keep the heading if Nikita likes it, and rework two or three of the others into plain statements with the evidence first (for example, "RAND's interviews point to five causes...").
- **A2. One-line closers.** "The machine handles the volume, and people confirm what it finds." (Network Rail); "Generative AI earns its keep where finding and drafting take real time and a person checks the result before it matters."; "That alone is a good reason to pay for business seats."; "The law you already follow still applies."; the final sentence of "People and jobs". Cut at least three; the paragraphs stand without them.
- **A3. Slogan-like short openers in a row.** "Most firms have." / "Real use is still rare." / "The hard part has moved." / "UK adoption is broad but shallow." / "Sometimes the answer is no AI at all." / "The seats are rarely the big cost." / "Skills are the bigger gap." / "People still worry." / "It doesn't settle the matter, though." Vary them: merge a few into the following sentence ("Real use is still rare: only 2% of UK businesses...").
- **A4. Forced triad.** "The need splits three ways." followed by three tidy sentences. Fine as a structure; drop the announcing sentence.
- **A5. Neat pairings.** "Distrust of AI covers two separate problems: trusting it when it's wrong, and overruling it when it's right." Reads well and is accurate to the study; keep, but it's the kind of line a humanizer pass will flag.
- **A6. Gist.** "Machine learning predicts, vision inspects, generative AI finds and drafts, and agents act." A four-part parallel list. Acceptable in a summary, but with the G1 fix the gist ends up with three slogan-shaped sentences in a row; consider merging two.

Run humanizer over the revised text, as the content rules require.

## Resolved (26 November 2026)

All flags fixed in the draft. Humanizer re-run over the changed passages; tests, build, link check and spell check re-run and clean.

- **F1, G1.** Opening now says UK manufacturers *that use AI* have mostly met it through that second door. The gist now reads "Few UK manufacturers use AI yet, and most that do have only met the chatbot".
- **G2.** Gist says "the UK results with published baselines come from the older kinds".
- **F2.** Cut "sits behind most computer vision"; computer vision is now described as the Playbook does.
- **F3, F14, F4, F13.** Labelled as our experience ("In our experience..."), narrowed to the benchmark, and linked AnomalyDINO again.
- **F5.** Now "We could not find a measured failure rate for industrial AI."
- **F6.** Cut the unsourced ranking clause; kept "Untrusted or siloed data still stalls AI".
- **F7.** Labelled as our experience, and the "seconds" claim removed.
- **F8.** Microsoft, OpenAI, Anthropic and Google links added in the same paragraph (Microsoft at its new address).
- **F9, F11, F12.** Labelled "In our view".
- **F10, T6.** KTP links now go to the stable KTP programme site (https://iuk-ktp.org.uk/) and UKRI's grant-rates page; text says "67% of costs for most SME projects".
- **F15 to F39.** Applied as suggested. F27 now links Yokogawa's 30 March 2023 release, checked in a browser: 35 days, steam use down 40% against manual control. F39 adds "Clearer regulation" (50%) and "Customer demand" (40%) to the bar chart, and "unweighted base" to its source.
- **T1 to T5, T7.** Applied. ISO/IEC 42001 now links ISO's own page (https://www.iso.org/standard/42001), because BSI's pages don't make the current 2026 edition clear.
- **L1, L2.** No landing page exists for either document; both are marked "(PDF)". HVM Catapult's reports hub lists the report but has no page for it.
- **L3.** Now links Regulation (EU) 2026/1744 on EUR-Lex (https://eur-lex.europa.eu/eli/reg/2026/1744/oj), checked in a browser: Chapter III applies from 2 December 2027 for Annex III systems and 2 August 2028 for Article 6(1) systems in regulated products.
- **P2, P4, P5.** Plan renamed "Google Workspace Standard" (checked in a browser: £11.80, Gemini included); "US list price" added to the two US$ rows; the Microsoft offer is noted as for existing Business customers.
- **A1 to A4.** Reworked the staged openers and closers flagged (ChatGPT opener, Network Rail, generative AI closer, "The law you already follow", "The causes are clearer than the rate", "UK firms put understanding ahead of money", "The need splits three ways", "It doesn't settle the matter"). Kept the "Cheaper to build, not cheaper to get right" heading for Nikita to judge. A5 kept, as the fact-checker suggested.
- **Unreachable (BridgeAI programme page).** Opens in a browser and with a plain request (200); the fact-checker's fetches timed out.
- **Still for Nikita to open by hand:** the Gartner releases (403 to bots; figures confirmed through reprints), RAND (403), AI Skills Hub (403) and OpenLearn (403).
