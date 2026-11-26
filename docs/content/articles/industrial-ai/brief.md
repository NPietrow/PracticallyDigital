# Research brief: Practical AI for industry

- **Issue:** [#14](https://github.com/NPietrow/PracticallyDigital/issues/14), "Practical AI for Complex Industrial Data"
- **Article file:** `src/content/articles/industrial-ai.mdx`, published at `/insights/industrial-ai/`
- **Topics:** `ai-and-analytics`. **Problems:** `untrusted-data`, `skills-and-adoption`, `quality-and-scrap`
- **Title:** Practical AI for Industry: What It Is and Where It Adds Value (Nikita, 26 November 2026)
- **Research date:** 25 November 2026, with follow-ups on 26 November 2026 (approved against unapproved tools, agentic AI, MTC pages). It builds on the Data foundations research of 18 to 24 November 2026, and links to that article.
- **Status:** approved by Nikita with changes on 26 November 2026 (see "Decisions" at the end).

## Angle

**AI is a family of tools, not one product. The value is in matching the right one to a decision you can measure.**

In five years AI has moved from niche work, such as defect detection or one-off data analysis, into almost every employee's software. Most UK industrial firms met it as a chatbot. ONS data shows what that looks like: about one in five manufacturers uses any AI, mostly free tools for text and images, and only 4% use machine learning on their own data. The article explains the four levels plainly: machine learning on data, computer vision, generative AI and agentic AI. For each it covers what the level is, what it needs and where it pays off. It then takes the reader's concerns in turn: trust, skills, cost, infrastructure, data, jobs, governance and the tools staff already use without approval. Nikita's view runs through it. Generative AI has cut the cost and skills needed to build AI, but many firms jumped straight to it, skipping the foundations and the simpler AI that often pays off first. Good data plus a well-chosen use case now gives a small team what used to need a large one. The reader leaves able to tell the levels apart, pick a first use case, see what it will really cost and who signs it off, and know when not to bother.

**Why this fits the evidence.** The UK examples with operator-published baselines use the older levels: NESO's solar forecasting (claim 9) and Network Rail's track-image inspection (claim 12). Generative AI's UK evidence is office trials, which found time saved but no measured productivity gain (claims 17 and 18). No one has measured an industrial AI failure rate. The famous figures are forecasts or misreadings (claims 37 to 42). Firms say what holds them back is not knowing how AI could help and having no business case, ahead of cost (claims 43 and 44). That supports an article that explains the levels and how to choose, rather than one that sells AI.

## What already exists, and the gap

The 2026 UK guidance is one framework told in several places by the same authors:

- **Made Smarter's toolkit** ([AI Adoption in Manufacturing](https://www.madesmarter.uk/resources/ai-adoption-in-manufacturing/), April 2026). Task first, then Scan, Pilot, Scale, with Predict, Sense, Create and Do as the types of AI.
- **The AI Champion's plan** ([AI Adoption Plan: Advanced Manufacturing](https://www.gov.uk/government/publications/ai-champions-ai-adoption-plans/ai-adoption-plan-advanced-manufacturing), updated 16 November 2026). Its most useful services, the AI front door and SME fast-track, are still proposals.
- **HVM Catapult's national pilot.**

The regulators each cover one slice:

- **NCSC:** security, board questions and shadow AI.
- **ICO:** personal data and automated decisions about people.
- **HSE:** safety and machinery.
- **DSIT:** the AI Cyber Security Code of Practice.

Specialist assurance work comes from HVM Catapult, NPL, the MTC and the IET.

What's missing, from a non-exhaustive search, so the article should say "we could not find":

- a vendor-neutral, plain-English map from the levels of AI to factory decisions, with the data each needs and how each fails;
- a plain "when not to use AI";
- how a plant manager checks outputs and who signs them off;
- a governance starter sized for a small firm, now that DSIT has dropped its AI Management Essentials tool (claim 79);
- honest cost ranges, separating a seat licence from a shop-floor deployment;
- one place that joins up who regulates what.

**What this article adds:** those six things, in one piece, built on Scan, Pilot, Scale rather than offering a rival framework. It links to Data foundations wherever AI depends on trusted data.

## Outline

About 3,000 words, weighted towards what AI is and where it adds value: sections 1 to 3 take roughly 1,300 of them. The reader's concerns from the issue are grouped into the sections below rather than answered one by one (decision 3). Sections 2, 3, 6 and 7 carry the costs, limitations and "when not to bother".

| # | Proposed H2 | What it covers | Claims |
|---|---|---|---|
| | *(Opening, no heading)* | Nikita's five-year view: AI went from edge cases to everyday software. Most firms met the chatbot first. Stat row from ONS. The argument in a paragraph | 29 to 31, 7 |
| 1 | What "AI" actually means | Is it ChatGPT? The family: machine learning, deep learning and vision, generative AI and LLMs, agents, in the government's wording. Made Smarter's Predict, Sense, Create, Do. The levels diagram | 1 to 8 |
| 2 | Where each kind of AI adds value | Levels 1 to 3, each with its best UK evidence and typical failure. Machine learning: NESO, and the AMRC model that couldn't generalise. Vision: Network Rail, BAE's 30 images, anomaly detection trained on good parts (quality and scrap). Generative AI: the GDS and DBT Copilot trials, and the factory assistant whose users preferred a colleague. **Limitations of each level are here** | 9 to 20 |
| 3 | Agentic AI: the hype and the evidence | What an agent is and isn't (a workflow, a chatbot, a copilot), and the two meanings of "agent" in industry. How little is deployed: DSIT's 2%, Capgemini's 2% scaled, Gartner's hype cycle and "agent washing". The best examples, mostly international and all self-reported, with the human still acting in most. What goes wrong: benchmarks, Project Vend, the Replit database deletion, red-teaming, the MTC robot test. The Five Eyes advice: start small and low-risk, or use simpler automation. **Limitations and "when not to bother" for agents are here** | 21 to 26, 94 to 112 |
| 4 | Cheaper to build, not cheaper to get right | Nikita's point that GenAI and pre-trained models cut the effort, cost and skills needed to build, with the evidence. Where UK industry actually is (bar chart): light use, mostly office, mostly free tools. Nikita's observation that many firms skipped to GenAI, beside the ONS mix. Links to Data foundations | 15, 27 to 36 |
| 5 | Why AI projects stall | A callout on the famous failure figures (RAND's 80%, Gartner's forecasts, NANDA's preliminary 95%). What does stall projects: RAND's root causes, DSIT's barriers, time saved isn't productivity, AI needs complements, and guidance thinnest at the problem-scoping stage (MTC review). Links to Data foundations on untrusted data | 37 to 47, 113 |
| 6 | Where to start, and when not to bother | Too many ideas: Made Smarter's task-first screen of value and feasibility, then Scan, Pilot, Scale. Record a baseline. Value-feasibility diagram. When a rule, a control chart or a process fix beats AI. Models need looking after. **"When not to bother" is here** | 48 to 53 |
| 7 | What it costs, and the skills it needs | What a team pays for AI seats (table), against what firms actually spend and DSIT's finding that staff time is the real cost. Data and labelling: train on good parts, use the coarsest label. Infrastructure by level. Skills as three different needs. Funding and training, with no deadlines. **Costs are here** | 54 to 65 |
| 8 | Trust, governance and shadow AI | Calibrated trust (the Siemens factory experiment). Test against known cases (HVM and NPL). Who signs off (AQuA roles diagram). No UK AI Act: existing law applies. The free minimum, including a named AI governance owner or team (MTC governance paper). **Shadow AI** as a subsection: what it is, how common it is, why an approved tool helps but doesn't solve it, and what to do. **The limits of current guidance are here** | 66 to 87, 114 to 122 |
| 9 | People and jobs | Exposure is high and measured job loss isn't. Manufacturing headcount mostly unchanged. Consult early (Acas). The parts that don't change when a new model ships | 88 to 93 |
| 10 | Tools and resources | Things to use | see below |
| 11 | Further reading | Things to read | see below |

## Claims

Evidence labels in the "Where" column:
- **[A]**: extracted from the primary file and checked against the page.
- **[O]**: primary page or document opened.
- **[R]**: read through a tool that summarises pages, so the wording needs checking.
- **[E]**: seen only in a search excerpt or reprint, usually because the site blocks automated access. It must be opened by hand before use.
- **[D]**: our arithmetic on cited figures.
- **[C]**: carried forward from the Data foundations brief, where it was checked.

Links go to landing pages, with the file and page in "Where" when the figure lives only in a file. The fact-check opens every source again.

### What AI means

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 1 | The UK Government's AI Playbook uses the OECD definition: an AI system is a machine-based system that infers from its inputs how to generate outputs such as predictions, content, recommendations or decisions | https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html | "Understanding AI", 10 February 2025. [O] | fact |
| 2 | The Playbook describes machine learning (learns from data), deep learning (a subset of machine learning with more complex models), computer vision, generative AI, large language models (large neural networks trained on text) and agentic AI (autonomous systems that decide and act with minimal human intervention) | Same as claim 1 | "Understanding AI". [O] | fact |
| 3 | The Playbook says machine learning remains the first choice for simpler tasks, because it needs less data and computing power | Same as claim 1 | "Understanding AI". [O] | fact |
| 4 | In an AI agent, a language model plans the route through registered "tools" that call systems and databases, where traditional software follows fixed paths. GDS says fixed sequencing or conventional code is preferable where a process is already well understood, and warns that agent costs and compatibility breaks add up | https://www.gov.uk/government/publications/ai-insights/ai-insights-agentic-ai-html | AI Insights: Agentic AI, updated 3 August 2026. [O] | fact |
| 5 | The ICO defines hallucination as incorrect, misleading or fabricated output that arises because a model relies on patterns in its training data rather than factual understanding | https://ico.org.uk/about-the-ico/what-we-do/our-work-on-artificial-intelligence/response-to-the-consultation-series-on-generative-ai/glossary/ | Glossary, undated. [O] | fact |
| 6 | Made Smarter groups AI for manufacturers into four types: Predict, Sense, Create and Do. It separates IT AI (office systems and copilots, quick and reversible to trial) from OT AI (machines, PLCs and vision, slower, where trust and validation are the bottleneck), and expects most SMEs to start with IT AI | https://www.madesmarter.uk/resources/ai-adoption-in-manufacturing/ | Toolkit PDF pp.8 to 10, 22 April 2026. [A] | fact |
| 7 | In June 2026, 35% of UK businesses with 10 or more employees used at least one AI technology: 18% large language models, 16% visual content, 12% machine learning on data, 6% machine learning on images and 2% robotics | https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026 | ONS, 20 July 2026, BICS Wave 159. [R] | figure |
| 8 | In DSIT's 2026 survey, approaches based on large language models made up 77% of the AI that businesses use or plan to use | https://www.gov.uk/government/publications/ai-adoption-survey-2026 | Executive summary, 29 October 2026. [O] | figure |

### Where each level pays off

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 9 | NESO's machine-learning solar forecast, built with Open Climate Fix, was 2.8 times more accurate than NESO's existing forecast up to two hours ahead (mean error 233 MW against 650 MW), and has been in the control room since December 2022 | https://www.neso.energy/news/solar-nowcasting-innovation-project-improves-solar-forecasting | News item, 19 July 2024. Operator-published. [O] | example |
| 10 | The project cost £500,000 of innovation funding (2021 to 2025) and reports about 30% to 40% better accuracy than other forecasts at up to eight hours ahead. This baseline differs from claim 9's, so the two must not be combined | https://www.neso.energy/about/innovation/our-innovation-projects/pv-nowcasting | Project page. [O] | example |
| 11 | An AMRC model trained on 62 milled blocks predicted robot milling error to about 0.3 mm inside its training range, but could not generalise outside it. The work reached TRL 5 | https://www.amrc.co.uk/case-studies/developing-machine-learning-solution-to-predict-errors-in-robotic-milling-processes | Case study, 30 November 2024. Programme-authored. [O] | example |
| 12 | Network Rail's Plain Line Pattern Recognition photographs track every 0.8 mm at up to 125 mph. By February 2019 it had replaced manual inspection on 8,500 miles of track, with experts confirming flagged defects before local teams see them, and estimated savings of £2.2m by the end of Control Period 6 | https://www.networkrail.co.uk/stories/how-cutting-edge-track-technology-is-reducing-delays-for-passengers/ | Story, 11 February 2019. Old; call it "automated image analysis", since the method isn't stated. [O] | example |
| 13 | BAE Systems Air told Made Smarter that aerospace weld inspection may offer as few as 30 X-ray images per part to train on. The system it trialled doesn't use deep learning, and the reported results are qualitative | https://madesmarter.uk/resources/innovation-case-study-bae-systems-machine-intelligence | Case study, 27 November 2024. Programme-authored. [O] | example |
| 14 | The MVTec AD benchmark trains defect detection on images of good parts only. Its licence forbids commercial use, so it shows what the method can do, not a dataset a factory can use | https://www.mvtec.com/company/research/datasets/mvtec-ad | Dataset page. [O] | fact |
| 15 | AnomalyDINO, a method needing no training, reports 96.6% image-level detection (AUROC) on MVTec AD from a single good image per product | https://arxiv.org/abs/2405.14529 | Damm et al., WACV 2025, abstract. [O]. A benchmark score, not a factory acceptance test | figure |
| 16 | Google's guidance for its automated image classifier recommends about 1,000 training images per label, with a minimum of 10 | https://docs.cloud.google.com/vertex-ai/docs/image-data/classification/prepare-data | Vendor guidance. [O] | figure |
| 17 | In the cross-government Microsoft 365 Copilot trial (about 20,000 licences, 12 organisations, September to December 2024), users self-reported saving 26 minutes a day on average. The trial had no control group | https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report/microsoft-365-copilot-experiment-cross-government-findings-report-html | GDS findings report, 2 June 2025, results and limitations. [O] | figure |
| 18 | The Department for Business and Trade's Copilot pilot (1,000 licences) found small time savings on written tasks, but did not find evidence that they improved productivity. Some tasks, such as scheduling, took longer, and hallucinations were observed | https://www.gov.uk/government/publications/microsoft-365-copilot-pilot-dbt-evaluation-report | Evaluation report, 28 August 2025, executive summary, PDF pp.4 to 5. [A] | figure |
| 19 | In a study of a document-answering assistant at a detergent factory, the nine users valued faster access to manuals, but preferred asking a nearby expert when one was available and raised safety concerns | https://arxiv.org/abs/2401.05200 | Kernan Freire et al., preprint, revised 26 February 2024, user study. [O]. One site, small sample | example |
| 20 | The government's AI Security Institute says current AI systems are often confidently wrong, and that errors compound over long multi-step tasks | https://www.aisi.gov.uk/blog/mapping-the-limitations-of-current-ai-systems | Blog, 23 October 2025. [O] | fact |
| 21 | The NCSC's guidance on agentic AI lists risks including acting outside the intended scope, excessive access and safeguards that can be bypassed. It advises matching controls to autonomy, sandboxing by default, giving each agent its own identity and short-lived credentials, keeping tamper-protected logs and keeping the ability to cut the agent off | https://www.ncsc.gov.uk/blogs/managing-the-cyber-risk-of-agentic-ai | Blog, 20 August 2026. [O] | fact |
| 22 | The NCSC argues that prompt injection may never be fully fixed, because a language model draws no line between data and instructions, so a model reading untrusted content should be kept away from privileged tools | https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection | Blog, 8 December 2025. [O] | fact |
| 23 | Joint guidance from the Five Eyes cyber agencies says to start small with agentic AI and use it only for low-risk tasks | https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/careful-adoption-of-agentic-ai-services | May 2026. [E] | fact |
| 24 | DSIT's 2026 survey found 2% of UK businesses with five or more staff using agentic AI | https://www.gov.uk/government/publications/ai-adoption-survey-2026 | Report PDF Figure 4, p.25. [A] | figure |
| 25 | In HVM Catapult's assurance tests, an LLM-driven robotic inspection system scored 88% on functional testing but 65% on consistency. The recommendation was human approval of every command until consistency passed 95% | https://hvm.catapult.org.uk/wp-content/uploads/2026/03/Trustworthy-AI-adoption.pdf | HVM Catapult with NPL, *Trustworthy AI adoption*, Spring 2026, printed pp.13 to 15. [A]. No landing page found; the HVM page says "available on request". **MTC system: see open question 1** | figure |
| 26 | The same report ran third-party assurance tests on six real industrial AI systems from six Catapult centres. It concludes that industrial deployment is held back by a lack of confidence rather than of ambition | Same as claim 25 | Printed p.27. [A] | fact |

### Cheaper to build, not cheaper to get right

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 27 | Stanford's AI Index 2025 reports that the cost of running a model at GPT-3.5's level fell more than 280-fold between November 2022 and October 2024 | https://hai.stanford.edu/news/ai-index-2025-state-of-ai-in-10-charts | AI Index 2025 in 10 charts. [E]: open the full report | figure |
| 28 | DSIT found that the cost of adopting AI is mostly the time and effort to implement it, not the price of the tool. One interviewee estimated that a new technology took a quarter to a fifth of their time over six months | https://www.gov.uk/government/publications/ai-adoption-survey-2026 | Report PDF pp.51 to 53. [A] | fact |

### How far UK industry has got

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 29 | About 20% of UK manufacturers used at least one AI technology in late September 2026, against 30% of all businesses | https://www.ons.gov.uk/economy/economicoutputandproductivity/output/datasets/businessinsightsandimpactontheukeconomy/bicswave165 | BICS Wave 165 workbook, sheet AI Current Usage TS (WTD): 100 − 76.1 − 3.7 = 20.2. [A] [D] [C] | figure |
| 30 | Manufacturers' AI use by type: visual content 12.2%, text generation 10.3%, machine learning on data 4.0%, machine learning on images 2.3% and robotics 2.3% | Same as claim 29 | Same sheet. [A] [C] | figure |
| 31 | Among manufacturers using AI or unsure, 7.2% use it extensively and 64.1% on a limited basis. 60.1% adopted it through free software, 61.1% had trained no staff, and 73.3% had spent nothing or under £10,000 in the past year | Same as claim 29 | Sheets AI Extent Use, AI How Adopted, AI Workforce Training and AI Investment. [A] [D] (33.1 + 40.2) | figure |
| 32 | 30% of all UK businesses used AI in September 2026, against 9% in September 2023 | https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/bulletins/businessinsightsandimpactontheukeconomy/8october2026 | ONS bulletin, 8 October 2026. [R] | figure |
| 33 | In DSIT's 2026 survey (3,503 interviews, January to April 2026, five or more staff), 32% of businesses used AI, up from 16% in 2025. The group covering agriculture, mining, manufacturing and energy was also at 32%, up from 14% | https://www.gov.uk/government/publications/ai-adoption-survey-2026 | Report PDF Figure 2, pp.21 to 22. [A] | figure |
| 34 | In Make UK's 2026 member survey, 2% had AI widely embedded, 37% moderate use, 43% limited experiments and 18% had not adopted it. The report gives no sample size | https://www.makeuk.org/insights/reports/ai-skills-and-future-uk-manufacturing-sector | PDF p.3 and Chart 1, pp.6 to 7. [A] [C] | figure |
| 35 | Make UK's members use AI mostly in business support (83%), then design and R&D (24%), with production at 11%, supply chain at 7% and quality control at 6% | Same as claim 34 | Chart 2, p.8. [A] [C] | figure |
| 36 | In ONS's 2023 management survey, 5% of manufacturers used AI against 9% in services. Better-managed firms were more likely to adopt AI, and more likely to follow through on plans to (48% in the best-managed tenth against 17% near the bottom) | https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/articles/managementpracticesandtheadoptionoftechnologyandartificialintelligenceinukfirms2023/2025-03-24 | Table 2, Figures 10 and 11, 24 March 2025. [R]. Cross-sectional; follow-through from a linked, unweighted sample | figure |

### Why projects stall

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 37 | RAND did not measure an AI failure rate. The "more than 80%" figure it repeats is an outside estimate it attributes to a 2022 *Fortune* article | https://www.rand.org/pubs/research_reports/RRA2680-1.html | Report summary and p.1, 13 August 2024. [R] | fact |
| 38 | RAND's five root causes of AI project failure: leaders misunderstanding the problem and its measures; unsuitable data; chasing the technology rather than the user's problem; underinvesting in infrastructure; and applying AI to problems beyond it | Same as claim 37 | Summary. [R] [C] | fact |
| 39 | RAND interviewed 65 data scientists and engineers; 84% of the 50 from industry named leadership-driven failures as a primary cause. RAND notes its mostly non-managerial sample may skew blame towards leaders | Same as claim 37 | PDF p.5. [O] [C] | figure |
| 40 | Gartner's "30% of generative AI projects abandoned after proof of concept by the end of 2025" was a forecast, not a measurement | https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025 | Press release, 29 July 2024. [E]: Gartner blocks automated access | fact |
| 41 | Gartner's "over 40% of agentic AI projects cancelled by the end of 2027" is also a forecast, drawn partly from a poll of 3,412 webinar attendees | https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 | Press release, 25 June 2025. [E] | fact |
| 42 | MIT NANDA's "95%" figure comes from a preliminary, mostly US study built on interviews and a conference survey. Its line is that 95% of organisations get zero return, the authors call the results directionally accurate, and on its own figures about a quarter of piloted custom tools reached production | https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf | *The GenAI Divide*, July 2025, pp.3, 6, 7 and 24. [A] [D]. **Third-party copy only; see open question 6** | fact |
| 43 | Among UK businesses using AI, the most-cited barriers were limited AI skills (67%), not knowing how AI could help (64%) and concerns about bias or accuracy (56%), with cost at 20%. Asked for the single biggest barrier, not knowing how AI could help came first (21%) and cost fourth (4%) | https://www.gov.uk/government/publications/ai-adoption-survey-2026 | Report PDF Figure 22, p.52, and data tables 60 and 63. [A] | figure |
| 44 | Among 2,041 non-adopters, what would most make them adopt: a better understanding of how AI could help (62%), a clear business case or proven return in their industry (61%), seeing peers succeed (50%), clearer regulation (50%), greater trust (50%), workforce skills (46%), simpler tools (45%), better data (41%), and lower cost (35%) | Same as claim 43 | Report PDF Figure 23, p.57, data table 64. [A] | figure |
| 45 | 71% of AI users report improved workforce productivity, but 64% report no change in operating costs | Same as claim 43 | Report PDF Figures 19 and 20, pp.46 to 48. [A] | figure |
| 46 | A US study of more than 30,000 manufacturing plants linked predictive analytics to higher productivity only alongside IT capital, educated workers or high-flow production | https://digitaleconomy.stanford.edu/publication/the-power-of-prediction-predictive-analytics-workplace-complements-and-business-performance | Abstract. US data. [O] [C] | fact |
| 47 | Deloitte's 2026 survey of more than 140 manufacturers found only about one in five AI use cases scaled across sites or the enterprise. Data availability or quality ranked fifth among challenges (30%), behind cost (43%) and lack of expertise (35%) | https://www.deloitte.com/ch/en/Industries/industrial-construction/perspectives/ai-in-manufacturing.html | Page dated 30 June 2026. Consultancy-authored; region not stated. [R] [C] | figure |

### Where to start, and when not to bother

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 48 | Made Smarter's toolkit says successful manufacturers start from tasks, problems and outcomes, not from AI as a technology. Its steps: find the tasks, rank them by value and feasibility, match each to a type of AI, pilot safely, then scale. Feasibility means the data exists, the workflow is stable, the risk is manageable and it can be trialled without disrupting operations. It advises starting with the data you have | https://www.madesmarter.uk/resources/ai-adoption-in-manufacturing/ | Toolkit PDF pp.3 and 10 to 15. [A]. Pull-quote candidate: "Successful manufacturers do not start with AI as a technology." (wording to confirm) | fact |
| 49 | Made Smarter says pilots need clear success measures and human oversight. OT pilots should run alongside existing processes and be compared with current methods | Same as claim 48 | Toolkit PDF pp.13 to 15. [A] | fact |
| 50 | The AI Champion's plan proposes a national Scan, Pilot, Scale pathway. Its AI front door, SME fast-track and trusted data environments are proposals, not live services | https://www.gov.uk/government/publications/ai-champions-ai-adoption-plans/ai-adoption-plan-advanced-manufacturing | Updated 16 November 2026. [O]. Recheck before publishing | fact |
| 51 | Google's Rules of Machine Learning say not to be afraid to launch without machine learning, and to move to it once hand-written rules get too complex to maintain | https://developers.google.com/machine-learning/guides/rules-of-ml | Rules 1 and 3. [O] | fact |
| 52 | The AI Playbook says a problem may be solved more easily with established technology, and asks for plans covering maintenance, drift monitoring, fallback processes and secure shutdown | https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html | Principles 5 and 6. [O] | fact |
| 53 | Real-world machine learning systems carry large ongoing maintenance costs, from tangled dependencies, hidden feedback loops and changes in the world they model | https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html | Sculley et al., NeurIPS 2015. [O]. Old but still the standard reference | fact |

### What it costs

Prices checked on 25 November 2026, and they change often. Recheck on the publish date.

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 54 | Microsoft 365 Copilot Business costs £13.80 per user a month paid yearly, before VAT. This is a first-year promotion on offers made by 31 December 2026; the normal price is £16.10 | https://www.microsoft.com/en-gb/copilot/pricing/business | Pricing page. [O]. Vendor | figure |
| 55 | ChatGPT Business and Claude Team standard seats cost US$20 per user a month paid annually, or US$25 monthly, with no pound prices published. Google Workspace Business Standard, which includes Gemini, is £11.80 per user a month on annual terms | https://help.openai.com/en/articles/8792828-what-is-chatgpt-business | With https://claude.com/pricing and https://workspace.google.com/intl/en_uk/pricing.html. [O]. Vendor | figure |
| 56 | All four vendors say prompts on business plans aren't used to train their models by default. Consumer ChatGPT may use chats for training unless the user turns it off | https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance | With https://openai.com/enterprise-privacy/, https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection, https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training and https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub. [O]. Vendor claims | fact |
| 57 | Among UK AI users who could estimate their spending, 47% reported spending nothing on AI in 2025. The mean was about £7,500, from £3,500 for micro firms to £25,000 for large ones | https://www.gov.uk/government/publications/ai-adoption-survey-2026 | Report PDF p.43. [A] | figure |
| 58 | Several 2025 to 2026 studies treat synthetic defect images as a supplement to real ones, not a replacement | *(source to find)* | [E]: **no usable source yet. Drop unless the fact-check finds one** | fact |
| 59 | Made Smarter Adoption offers match-funded grants of up to £20,000 to manufacturing SMEs in several English regions, with terms that vary by region | https://www.madesmarter.uk/adoption/ | Programme page, checked 25 November 2026. [O] [C] | fact |
| 60 | Knowledge Transfer Partnerships pair a business with a university team and a graduate, with grant rates of 67% for SMEs and 50% for large businesses | https://www.ukri.org/opportunity/knowledge-transfer-partnership-2026-to-2027-round-4/ | With the grant rates page in the Data foundations brief, claim 51. [O] [C]. No dates in the article (decision 5) | fact |
| 61 | Innovate UK's BridgeAI funds AI deployment projects in which an SME that makes an AI product works with a business that deploys it | https://iuk-business-connect.org.uk/opportunities/bridgeai-deployment-catalyst-ai-for-operational-systems/ | Competition page. [O]. No deadline in the article (decision 5); link to the programme rather than one competition | fact |
| 62 | The Level 6 machine learning engineer apprenticeship has up to £22,000 of funding, so a non-levy employer's 5% share is £1,100 for an apprentice aged 25 or over, plus wages. Data technician (Level 3, £13,000) and data analyst (Level 4, £15,000) apprenticeships suit process staff | https://findapprenticeshiptraining.apprenticeships.education.gov.uk/courses/795 | Course page, with the Data foundations brief, claim 49. [O] [D] [C] | figure |
| 63 | The government's AI Skills Hub offers free short foundation courses to every UK adult, with a target of 10 million workers trained by 2030 | https://www.gov.uk/government/news/free-ai-training-for-all-as-government-and-industry-programme-expands-to-provide-10-million-workers-with-key-ai-skills-by-2030 | Press release, 28 January 2026. [O]. Press coverage says some hub listings charge a fee, so check | fact |
| 64 | DSIT's AI labour market survey found 57% of businesses had a technical AI skills gap, 35% struggled to fill AI roles and 88% relied on on-the-job training | https://www.gov.uk/government/publications/ai-labour-market-survey-2025-report/ai-labour-market-survey-2025-report-executive-summary | Executive summary, 28 January 2026. All sectors. [O] | figure |
| 65 | Over half of Make UK's members name skills shortages as the main obstacle to moving AI beyond small trials | https://www.makeuk.org/insights/reports/ai-skills-and-future-uk-manufacturing-sector | Report, 8 June 2026. [O]. No sample size | figure |

### Trust and sign-off

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 66 | In a randomised experiment at a Siemens electronics plant, 48 experienced workers checked circuit-board images with an AI quality score. Workers who also saw a heatmap of why the AI flagged an area raised their accuracy from 88.6% to 96.3%. They correctly overruled wrong AI calls 96.9% of the time against 86.4%, and were less likely to overrule correct ones. Decision speed didn't change | https://doi.org/10.1038/s41598-024-82501-9 | Senoner et al., *Scientific Reports* 14:31150, 28 December 2024, Results, with the authors' limitations (one task, one shift, high defect rate). [O]. Replaces the Data foundations brief's claim 61 with fuller figures | figure |
| 67 | The government's AQuA Book gives four roles for assuring analysis: a commissioner who asks for it, an analyst who builds it, an assurer independent of the analysts, and an approver who confirms it has been properly assured. How deep assurance goes depends on business criticality, novelty, complexity, precision needed and how long it will be used | https://www.gov.uk/guidance/the-aqua-book | Second edition, 30 July 2025, chapters 2, 3 and 5. [O] | fact |
| 68 | The AI Playbook asks for a human to validate any high-risk decision influenced by AI, with control built into other stages where real-time review isn't possible | https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html | Principle 4. [O] | fact |
| 69 | 81% of UK AI users apply at least some human checking to AI outputs, down from 84%, and 5% apply none, up from 2% | https://www.gov.uk/government/publications/ai-adoption-survey-2026 | Report PDF Figure 27, p.72. [A] | figure |
| 70 | NPL's five principles for AI assurance: explain AI clearly, scale assurance to the use and potential harm, measure real-world outcomes rather than only the model, build in oversight, and keep assuring after adoption | https://www.npl.co.uk/news/getting-the-measure-of-ai | 16 March 2026. Landing page only. [R] | fact |
| 71 | The MTC's 2024 whitepaper reviews AI standards for manufacturing around security, fairness, transparency, accountability and robustness, and argues that the number of standards makes it hard for manufacturers to find the guidance that applies | https://www.the-mtc.org/insights/ai-trustworthy-framework | 15 March 2024, landing page; document read on 26 November 2026 (claim 113). [O]. Nikita co-authored it; no disclosure line (decision 10) | fact |

### Governance

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 72 | The UK has no AI Act, and the May 2026 King's Speech contained no AI bill | https://iapp.org/news/a/king-s-speech-signals-diffuse-uk-digital-policy-agenda-but-no-ai-bill | IAPP, 14 May 2026. [O]. Professional-body news; check against a primary before publishing | fact |
| 73 | UK regulators apply five non-statutory principles: safety, security and robustness; transparency and explainability; fairness; accountability and governance; and contestability and redress | https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response | Government response, 6 February 2024. [O] | fact |
| 74 | HSE says health and safety law applies whatever the technology. Where AI affects workplace health and safety, employers must assess and control the risks, cyber threats included. HSE also acts as market surveillance authority for AI in workplace machinery | https://press.hse.gov.uk/2026/06/12/hses-regulatory-approach-to-artificial-intelligence-ai/ | Statement, 12 June 2026. [O] [C] (Data foundations claim 60). Pull-quote candidate | fact |
| 75 | The data protection parts of the Data (Use and Access) Act 2025 are in force. They widen the lawful grounds for significant automated decisions about people, provided safeguards continue. The ICO's updated guidance on automated decisions is still a draft | https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/the-data-use-and-access-act-2025-what-does-it-mean-for-organisations | Updated 19 June 2026, with https://ico.org.uk/for-organisations/adm/. [O] | fact |
| 76 | The EU's Digital Omnibus moved the AI Act's high-risk dates to 2 December 2027 for standalone systems such as employment uses, and to 2 August 2028 for AI in regulated products, machinery included | https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ | Regulation (EU) 2026/1744, in force 27 July 2026. [O] on a secondary host of the legal text; **swap for EUR-Lex** | fact |
| 77 | The EU Machinery Regulation applies from 20 January 2027, including in Northern Ireland | *(primary to find, e.g. EUR-Lex Regulation (EU) 2023/1230)* | [E]. Use only if confirmed | fact |
| 78 | Staff surveys suggest unapproved AI use is common. ONS finds 55% of employees use AI for work or study, against 35% of businesses reporting AI use | https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026 | 20 July 2026. [R]. ONS attributes part of the gap to how each is measured | figure |
| 79 | DSIT said on 6 February 2026 that it will not publish its AI Management Essentials self-assessment, and promised simpler governance guidance for SMEs, with no date | https://www.gov.uk/government/consultations/ai-management-essentials-tool/outcome/guidance-for-using-the-ai-management-essentials-tool-government-response | Government response. [O]. Recheck before publishing | fact |
| 80 | The UK's AI Cyber Security Code of Practice is free and voluntary, with 13 principles across design, development, deployment, maintenance and end of life. Most industrial firms count as system operators or end users under it | https://www.gov.uk/government/publications/ai-cyber-security-code-of-practice | 31 January 2025. [O] | fact |
| 81 | The NCSC's guidance for boards asks who is accountable for AI, what the worst-case failure of critical machine-learning systems would be, and how incidents and the supply chain are handled | https://www.ncsc.gov.uk/guidance/ai-and-cyber-security-what-you-need-to-know | 13 February 2024, modified 31 July 2026. [O] | fact |
| 82 | ISO/IEC 42001 is a paid, certifiable standard for AI management systems. BSI awarded its 50th certificate worldwide in October 2026 | https://www.bsigroup.com/en-US/insights-and-media/media-center/press-releases/2026/november/bsi-awards-its-50th-iso-iec-42001-certificate/ | Press release. [O] | fact |
| 83 | In a Microsoft-commissioned survey of 2,003 UK employees (October 2025), 71% had used unapproved consumer AI tools at work, and 51% did so weekly. 28% said their employer offered no approved option | https://ukstories.microsoft.com/features/rise-in-shadow-ai-tools-raising-security-concerns-for-uk | Microsoft UK Stories, 13 October 2025. [R]. Vendor-sponsored: Microsoft sells the approved alternative | figure |
| 84 | In Deloitte's 2026 UK workforce survey, 31% of generative AI users said they use it without their employer knowing | https://www.deloitte.com/uk/en/issues/generative-ai/genai-workforce-survey-shadow-ai.html | Fieldwork May to June 2026. [R]. Consultancy | figure |
| 85 | The NCSC treats shadow AI as a form of shadow IT. It advises finding out why staff use unapproved tools, offering secure alternatives and building a culture where concerns get raised | https://www.ncsc.gov.uk/blogs/the-hidden-risks-of-shadow-ai | Blog, 7 September 2026. [O] | fact |
| 86 | Acas advises clear AI policies, consulting staff before introducing AI, checking outputs, using IT-approved platforms and keeping sensitive business or personal data out of public tools | https://www.acas.org.uk/1-in-4-workers-worry-that-ai-will-lead-to-job-losses | 28 April 2025. [O] | fact |
| 87 | Most UK businesses' responsible-AI practices are informal, without documented policies or governance | https://www.gov.uk/government/publications/ai-adoption-survey-2026 | Report PDF p.71. [A] | fact |

### People and jobs

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 88 | The government estimates about 70% of UK workers are in jobs with tasks AI could perform or enhance, and says the evidence doesn't yet show AI causing job losses. It gives nothing specific to manufacturing | https://www.gov.uk/government/publications/assessment-of-ai-capabilities-and-the-impact-on-the-uk-labour-market/assessment-of-ai-capabilities-and-the-impact-on-the-uk-labour-market | DSIT and AI Security Institute, 28 January 2026. [O] | figure |
| 89 | Among manufacturers using AI, 71.3% reported no change in headcount, 2.4% a fall and 4.6% a rise | https://www.ons.gov.uk/economy/economicoutputandproductivity/output/datasets/businessinsightsandimpactontheukeconomy/bicswave165 | Sheet AI Impact on Headcount TS (WTD). [A] | figure |
| 90 | Job losses were the biggest AI worry for 26% of GB employees in an Acas poll, ahead of AI making mistakes (17%) | https://www.acas.org.uk/1-in-4-workers-worry-that-ai-will-lead-to-job-losses | YouGov for Acas, 1,023 employees, 27 March to 1 April 2025. [O] | figure |
| 91 | Of the 17% of Make UK members who say AI has already changed how work is organised, 86% have automated some tasks, and none have redesigned roles or created AI-specific jobs | https://www.makeuk.org/insights/reports/ai-skills-and-future-uk-manufacturing-sector | PDF Charts 3 and 4, p.9. [A] | figure |
| 92 | The government's AI Security Institute reports that the length of task frontier AI can complete has been doubling every few months | https://aisi.gov.uk/frontier-ai-trends-report | Frontier AI Trends Report, 18 December 2025. [E]: check the wording and the doubling period | fact |
| 93 | The UK Government's AI Playbook, the AI Cyber Security Code of Practice and HSE's statement set principles that stay the same when a new model is released | *(editorial)* | Our judgement from claims 52, 73, 74 and 80; label it as ours | fact |

### Agentic AI (added 26 November 2026)

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 94 | The NCSC describes agentic AI systems as able to access data sources, remember context, make decisions, use tools and take actions towards a goal, without continuous human input. Where a non-agentic tool produces a prediction or content, an agent acts, which makes it more useful and more hazardous | https://www.ncsc.gov.uk/sites/default/files/2026-06/Thinking-carefully-before-adopting-agentic-AI.pdf | NCSC blog, *Thinking carefully before adopting agentic AI*, 15 May 2026. [O]. Find the HTML blog page to link instead of the PDF copy | fact |
| 95 | Anthropic, an AI vendor, distinguishes workflows, where language models and tools follow predefined code paths, from agents, where the model directs its own steps. It advises starting with the simplest solution, because agents usually cost more and respond more slowly | https://www.anthropic.com/engineering/building-effective-agents | *Building effective agents*, 19 December 2024. [O]. Vendor | fact |
| 96 | Gartner estimates that only about 130 of the thousands of vendors claiming agentic AI offer the real thing, calling the rest "agent washing": assistants, RPA and chatbots rebranded | https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 | Press release, 25 June 2025. [E]: 403. Gartner's estimate; method not published | fact |
| 97 | In process control, "AI agent" can also mean a reinforcement-learning controller, such as Yokogawa's FKDPP: a different technology, with a different risk profile, from a language-model agent | https://www.yokogawa.com/eu/news/press-releases/2025/2025-10-29/ | Press release, 29 October 2025. [E]: page body empty on fetch. Vendor | fact |
| 98 | A third of UK businesses using agentic AI were still piloting it | https://www.gov.uk/government/publications/ai-adoption-survey-2026 | Report PDF Figure 8, p.31. [A] | figure |
| 99 | In Capgemini's survey of 1,500 executives at large firms in 14 countries, about a quarter had launched agentic AI pilots, 14% had begun implementing and 2% had scaled. Trust in fully autonomous agents fell from 43% to 27% in a year | https://www.capgemini.com/gb-en/news/press-releases/trust-and-human-ai-collaboration-set-to-define-the-next-era-of-agentic-ai-unlocking-450-billion-opportunity-by-2028/ | Press release, 16 July 2025, fieldwork April 2025. [O]. Consultancy | figure |
| 100 | In a Gartner survey of 360 IT application leaders, 75% were piloting or using some form of AI agent, but only 15% were considering or using fully autonomous agents, and 13% strongly agreed they had the right governance | https://gcom.pdo.aws.gartner.com/en/newsroom/press-releases/2025-09-30-gartner-survey-finds-just-15-percent-of-it-application-leaders-are-considering-piloting-or-deploying-fully-autonomous-ai-agents | Press release, 30 September 2025, fieldwork May to June 2025. [O]. Analyst. Swap to the gartner.com address if it resolves | figure |
| 101 | Gartner placed AI agents at the Peak of Inflated Expectations in its 2025 Hype Cycle for AI | https://www.gartner.com/en/newsroom/press-releases/2025-08-05-gartner-hype-cycle-identifies-top-ai-innovations-in-2025 | Press release, 5 August 2025. [E]. Analyst opinion | fact |
| 102 | A Yokogawa reinforcement-learning controller ran a distillation column at ENEOS Materials in Japan for 35 days in 2022, holding quality steady and cutting steam use by 40%, and is still in routine use | https://yokogawa.com/library/resources/references/successstory-eneos-materials | Customer success story. [E]. Vendor; no independent evaluation | example |
| 103 | At Aramco's Fadhili gas plant, Yokogawa's controllers now run the acid gas removal process. Initial results, still under evaluation, show amine and steam use down 10% to 15% and power down about 5% | Same as claim 97 | Press release, 29 October 2025. [E]. Vendor; baseline not stated | example |
| 104 | Aker BP reports that language-model agents from Cognite, which gather information and suggest root-cause analysis steps for engineers, cut engineers' time on root-cause analysis by over 70%. No baseline or method is given | https://akerbp.com/aker-bp-leverages-cognite-atlas-ai-to-pioneer-an-ai-first-future-in-exploration-and-production/ | Operator page, September 2025. [O]. Customer and vendor jointly | example |
| 105 | GE Appliances runs more than 800 agents on Google's Gemini Enterprise, many built by its own staff. A supplier agent handling order queries cut backorders by 25% (no period or baseline given), and a manager says outputs are reviewed by people because agents can drift and make mistakes | https://www.googlecloudpresscorner.com/2026-04-22-GE-Appliances-Reinvents-Manufacturing-Operations-at-Scale-with-Google-Clouds-Gemini-Enterprise | Google Cloud press release, 22 April 2026, with https://www.engineering.com/inside-ge-appliances-ai-agent-rollout/ (28 May 2026). [O]. Vendor and trade press | example |
| 106 | Siemens says early pilots of its generative AI maintenance assistant averaged a 25% cut in reactive maintenance time, with no sample or method given | https://press.siemens.com/global/en/pressrelease/siemens-expands-industrial-copilot-new-generative-ai-powered-maintenance-offering | Press release, 24 March 2025. [E]. Vendor | example |
| 107 | In τ-bench, a test of agents handling simulated customer service with tools and rules, the best 2024 model solved under half the tasks, and fewer than a quarter of retail tasks consistently across eight attempts | https://proceedings.iclr.cc/paper_files/paper/2025/file/1b126cc38b8638e07bef37e7b2bb72bf-Paper-Conference.pdf | ICLR 2025. [E]. Peer-reviewed; later models score higher | figure |
| 108 | In Anthropic's Project Vend, an AI agent running a small office shop for a month lost money, sold items below cost, was talked into discounts and invented a payment account | https://www.anthropic.com/research/project-vend-1 | 27 June 2025. [O]. Vendor, self-reported | example |
| 109 | In July 2025 an AI coding agent deleted a company's live production database during a code freeze, against instructions, then wrongly said it couldn't be restored | https://incidentdatabase.ai/cite/1152/ | AI Incident Database #1152, incident of 18 July 2025. [O] | example |
| 110 | In a red-teaming exercise run with the UK AI Security Institute, more than 250,000 attacks on agents built on 13 frontier models succeeded against every model at least once | https://www.nist.gov/blogs/caisi-research-blog/insights-ai-agent-security-large-scale-red-teaming-competition | NIST CAISI blog, 23 March 2026. [O] | figure |
| 111 | Joint guidance from the NCSC and its Five Eyes partners says to start small with agents, using them only for well-understood, low-risk tasks; to ask first whether the process could be simplified or automated in a lower-risk way; to give agents the least access for the shortest time; and to name who owns, monitors and can stop an agent before it touches real systems. Pull-quote candidate: "If you cannot understand, monitor or contain an agent's actions, it is not ready for deployment." | Same as claim 94 | NCSC summary of *Careful adoption of agentic AI services*, May 2026. [O] | fact |
| 112 | A flaw called EchoLeak let a crafted email make Microsoft 365 Copilot leak data with no click from the user, by hiding instructions in content the assistant read. Microsoft fixed it in 2025 | https://arxiv.org/abs/2509.10540 | CVE-2025-32711. [E]. Preprint; illustrates prompt injection (claim 22) | example |

### MTC whitepapers (added 26 November 2026)

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 113 | An MTC review of more than 40 AI standards and frameworks found most guidance covers the middle of the AI lifecycle, with scoping the problem and retiring the system poorly covered. It notes many AI problems start with poor problem scoping, that frameworks say what trustworthy AI is but rarely how or when to achieve it, and that certification bodies for AI models are hard to find | https://www.the-mtc.org/insights/ai-trustworthy-framework | *Trustworthy AI Framework*, April 2024, PDF pp.14 and 17 to 19. [A]. Nikita is a co-author; no disclosure line (decision 10) | fact |
| 114 | The MTC's AI governance paper recommends, for manufacturers using external AI services such as LLMs: validating the use case, judging the sensitivity of data sent, sending the minimum data, checking IP, keeping a human in the loop to review outputs, analysing risks, declaring AI-generated content, raising awareness, and an AI usage policy. It proposes an AI governance team that reviews each use case at a gate before setup and at intervals while running, and a live risk register in three nested tiers: generic, by category of use and by use case | https://www.the-mtc.org/insights/ai-governance | *Utilising Externally Hosted AI / Generative AI Services in Manufacturing*, 20 November 2023 (research to September 2023), PDF pp.7, 16, 17, 23 and 25. [A] (pages read as images) | fact |

### Shadow AI (added 26 November 2026)

| # | Claim | Source URL | Where in the source | Type |
|---|---|---|---|---|
| 115 | In Gartner's Q1 2026 survey of 12,004 employees and managers in 40 countries, 88% of employees with access to an enterprise AI tool also used personal AI tools for business tasks | https://www.gartner.com/en/newsroom/press-releases/2026-05-13-gartner-predicts-by-2027-50-percent-of-enterprises-without-a-people-centric-ai-strategy-will-lose-their-top-ai-talent | Press release, 13 May 2026. [E]: 403, **open by hand**. Gartner says "personal", not "unapproved" or "secret". The closest source to the claim Nikita remembered | figure |
| 116 | Microsoft's 2024 Work Trend Index found 78% of AI users brought their own AI tools to work, and 52% of people using AI at work were reluctant to admit using it for their most important tasks | https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part | 8 May 2024; 31,000 knowledge workers in 31 markets including the UK. [O]. Vendor (Microsoft sells Copilot). "Bring your own" means not provided by the employer, not necessarily banned | figure |
| 117 | Security-vendor traffic data shows personal-account use falling as firms buy business licences: Netskope saw the share of generative AI users on personal accounts fall from 78% to 47% in a year, with managed accounts up from 25% to 62% | https://threatlabs.netskope.com/reports/2026/cloud-and-threat-report-2026 | Cloud and Threat Report 2026, data October 2024 to October 2025. [O]. Vendor (sells monitoring); its customers only | figure |
| 118 | Cyberhaven's customer data put the share of workplace ChatGPT use through personal accounts at 73.8% in 2024 and 32.3% in 2026 | https://www.cyberhaven.com/press-releases/cyberhaven-2026-ai-adoption-risk-report | 2026 press release, with https://prnewswire.com/news-releases/cyberhaven-report-surge-in-shadow-ai-accounts-poses-fresh-risks-to-corporate-data-302151221.html (May 2024). [O]. Vendor; methods differ between years, so use the direction, not the size | figure |
| 119 | Harmonic Security found 26% of files uploaded to generative AI tools contained sensitive information, but personal and free accounts accounted for only 12% of sensitive exposures: most sensitive data now goes into licensed tools | https://www.harmonic.security/resources/genai-in-the-enterprise-its-getting-personal | Q3 2025, US and UK organisations, browser data. [O]. Vendor (sells AI data protection) | figure |
| 120 | Netskope's customers average about 223 generative AI data-policy violations a month, mostly source code (42%), regulated data (32%) and intellectual property (16%). A violation means a company's own rule was triggered, not a confirmed breach | Same as claim 117 | Same report. [O]. Vendor | figure |
| 121 | CIPD reports that 61% of UK employers allow staff to use generative AI for work and 25% don't, that 31% had worked on a generative AI policy in the past year, and that 43% of more advanced adopters had introduced platforms such as Copilot | https://www.cipd.org/uk/views-and-insights/thought-leadership/insight/employers-generative-ai/ | Labour Market Outlook. [E]: 403, **open by hand** for wave and sample | figure |

**Count:** 121 rows: 118 with a source, 2 with no source yet (58 and 77, dropped unless one is found) and 1 editorial (93). Claims 94 to 121 were added on 26 November 2026. The draft won't use all of them. Rows the draft doesn't use stay here as the research record.

**Checks still owed before publishing:** every [E] row, especially 115 and 121; prices (54 and 55) and the BridgeAI and KTP dates on the publish date; whether DSIT's SME guidance, the AI front door or an ICO AI code has appeared; the exact Made Smarter pull-quote wording.

**Not used, and why:**
- **"80% of AI projects fail" and "95% of GenAI pilots fail":** misreadings (claims 37 and 42).
- **Vendor surveys on agent adoption (Rootstock, Google Cloud, Snowflake):** they conflict with each other and with DSIT's 2%.
- **Sensitive-data-pasting figures (Veritas, KnowBe4, CybSafe):** excerpts only.
- **The Bank of England productivity estimate:** secondary only.
- **Sellafield's DANI2 £40m:** a 10-year forecast published by its consultant.
- **The P&G scrap figure:** trade press, vendor-linked.
- **The unnamed "30% less downtime" automotive case:** no primary.
- **DeepMind's 40% cooling saving:** 2016 self-report, and not a factory.
- **The ICO's draft shadow AI blog:** an unpublished FOI draft.

## Tools and resources candidates

| Resource | What it's for | Cost |
|---|---|---|
| [Made Smarter, AI Adoption in Manufacturing toolkit](https://www.madesmarter.uk/resources/ai-adoption-in-manufacturing/) | Task-first method, value and feasibility screen, Scan, Pilot, Scale | Free |
| [Made Smarter Adoption](https://www.madesmarter.uk/adoption/) | Funded advice, roadmaps and match-funded grants for manufacturing SMEs in England | Free advice; grants match-funded |
| [AI Cyber Security Code of Practice](https://www.gov.uk/government/publications/ai-cyber-security-code-of-practice) | Security principles for anyone running or using AI | Free |
| [NCSC, AI and cyber security: what you need to know](https://www.ncsc.gov.uk/guidance/ai-and-cyber-security-what-you-need-to-know) | Questions a board should ask about AI | Free |
| [NCSC, The hidden risks of shadow AI](https://www.ncsc.gov.uk/blogs/the-hidden-risks-of-shadow-ai) | Handling unapproved AI tools | Free |
| [HSE's regulatory approach to AI](https://press.hse.gov.uk/2026/06/12/hses-regulatory-approach-to-artificial-intelligence-ai/) | What health and safety law expects of AI at work | Free |
| [ICO AI and data protection risk toolkit](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/ai-and-data-protection-risk-toolkit/) | Risk checks where AI touches personal data (under review) | Free |
| [NCSC, Thinking carefully before adopting agentic AI](https://www.ncsc.gov.uk/sites/default/files/2026-06/Thinking-carefully-before-adopting-agentic-AI.pdf) | Plain advice on whether and how to try AI agents, from the Five Eyes guidance | Free |
| [The AQuA Book](https://www.gov.uk/guidance/the-aqua-book) | Roles and proportionate assurance for any model, AI included | Free |
| [Digital Catapult AI Adoption Toolkit](https://apps.digicatapult.org.uk/ai-adoption-toolkit/) | Digital, data and machine-learning maturity self-assessments for UK SMEs | Free |
| [OECD SME AI Readiness Tool](https://sme.oecd.ai/) | A short international readiness check that says it stores no data | Free (pilot) |
| [AI Skills Hub](https://aiskillshub.org.uk/) | Short foundation courses for any UK adult | Free foundation courses; some listings paid |
| [Elements of AI](https://www.elementsofai.com/) and [OpenLearn, AI Matters](https://www.open.edu/openlearn/education-development/ai-matters) | Neutral introductions for non-specialists | Free |
| [Knowledge Transfer Partnerships](https://www.ukri.org/opportunity/knowledge-transfer-partnership-2026-to-2027-round-4/) | A graduate and a university team on a two-to-three-year project | Grant-funded, 67% for SMEs |
| [Machine learning engineer apprenticeship](https://findapprenticeshiptraining.apprenticeships.education.gov.uk/courses/795) | Growing a specialist in-house | Funded; 5% employer share for non-levy firms |
| [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | A fuller risk framework, with a profile for generative AI (US; being revised) | Free |
| [ISO/IEC 42001](https://knowledge.bsigroup.com/products/information-technology-artificial-intelligence-management-system) | Certifiable AI management system, mainly for customer assurance | Paid |

## Further reading candidates

| Reading | Why |
|---|---|
| [RAND, The Root Causes of Failure for AI Projects](https://www.rand.org/pubs/research_reports/RRA2680-1.html) | Why AI projects fail, from the people who build them (US) |
| [Brynjolfsson, Jin and McElheran, The Power of Prediction](https://digitaleconomy.stanford.edu/publication/the-power-of-prediction-predictive-analytics-workplace-complements-and-business-performance) | The best evidence that analytics pays only with the right people, process and IT around it (US plants) |
| [Senoner et al., Explainable AI improves task performance in human–AI collaboration](https://doi.org/10.1038/s41598-024-82501-9) | A factory experiment on trust, readable in an evening |
| [DSIT, AI adoption survey 2026](https://www.gov.uk/government/publications/ai-adoption-survey-2026) | The UK's fullest picture of who uses AI, for what, and what holds firms back |
| [ONS, Artificial intelligence in UK businesses: 2023 to 2026](https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026) | Official adoption trends, by type of AI |
| [DBT, Microsoft 365 Copilot pilot evaluation](https://www.gov.uk/government/publications/microsoft-365-copilot-pilot-dbt-evaluation-report) | An honest evaluation that separates time saved from productivity gained |
| [HVM Catapult and NPL, Trustworthy AI adoption](https://hvm.catapult.org.uk/wp-content/uploads/2026/03/Trustworthy-AI-adoption.pdf) | What independent testing of real industrial AI systems found |
| [AI Champion, AI Adoption Plan: Advanced Manufacturing](https://www.gov.uk/government/publications/ai-champions-ai-adoption-plans/ai-adoption-plan-advanced-manufacturing) | Where national support for industrial AI is heading |
| [Google, Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml) | Practical engineering advice, starting with "launch without ML first" |
| [Sculley et al., Hidden Technical Debt in Machine Learning Systems](https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html) | Why a model costs more to keep than to build |
| [Agrawal, Gans and Goldfarb, Power and Prediction](https://store.hbr.org/product/power-and-prediction-the-disruptive-economics-of-artificial-intelligence/10580?sku=10580E-KND-ENG) | A book arguing that gains come from redesigning decisions, not bolting on tools (paid) |
| [MTC, AI: a trustworthy framework](https://www.the-mtc.org/insights/ai-trustworthy-framework) | A review of 40+ AI standards for manufacturers, and where they fall short |
| [MTC, AI governance](https://www.the-mtc.org/insights/ai-governance) | Recommendations, a three-tier risk register and a governance process for using external AI services such as ChatGPT |
| [A Data-First Approach to Digital Transformation](/insights/data-foundations/) | Our guide to the data AI depends on |

## Visuals

Each diagram is a hand-drawn SVG in the site's colours. The components follow the content rules, with an `href` on every figure.

**Diagrams:**
1. **`industrial-ai-levels`: the four levels of AI.** Four cards, each with the question it answers ("What will happen?", "Is this part good?", "Where does it say? Draft me one", "Go and do it"), what data it needs, a UK example and its typical failure. The core visual (claims 1 to 6 and 9 to 25).
2. **`industrial-ai-agent-spectrum`: from suggesting to acting.** A line from "fixed workflow" through "assistant suggests, a person acts" to "agent acts on systems", with the examples placed on it (Aker BP and GE Appliances suggest; Yokogawa's controllers act, but they're reinforcement learning, not language models) and the NCSC test at the acting end: can you understand, monitor and contain it? (claims 94 to 111).
3. **`industrial-ai-start`: where to start.** A value-against-feasibility grid, with "start here" in the high-value, high-feasibility corner and example tasks in each quarter. Adapted from Made Smarter's screen (claim 48), with the examples labelled as ours.
4. **`industrial-ai-sign-off`: who signs off.** The AQuA Book's four roles mapped to factory roles (process owner, engineering or data team, independent checker, named manager), with the depth of checking set by the consequence of an error, a review gate before go-live and monitoring after it (claims 67 to 69 and 114).

**Components:**
- **StatRow, opening:** 20% of manufacturers use any AI; 4.0% use machine learning on their data; 61.1% of users have trained no staff (claims 29 to 31).
- **BarChart:** what would make non-adopters adopt, with "lower cost" (35%) highlighted at the bottom (claim 44). Alternative: manufacturers' AI use by type, with machine learning on data highlighted (claim 30).
- **StatRow, agentic AI:** 2% of UK firms use agentic AI; 2% of large firms worldwide have scaled it; 15% of IT leaders are even considering fully autonomous agents (claims 24, 99 and 100).
- **StatRow, trust:** 88.6% accuracy without an explanation and 96.3% with one (claim 66), with 65% consistency from the robot test (claim 25).
- **StatRow, shadow AI:** 88% of staff with an enterprise AI tool also use personal ones; 78% of AI users bring their own; personal accounts down from 78% to 47% of generative AI users in a year (claims 115 to 117; 115 only once opened by hand).
- **PullQuotes:** the NCSC's "If you cannot understand, monitor or contain an agent's actions, it is not ready for deployment." (claim 111). Second: Made Smarter on starting from tasks, not technology (claim 48), once the wording is confirmed.
- **Callouts:**
  - a note on the famous failure figures (claims 37 to 42);
  - a note on "agent washing" and the two meanings of "agent" (claims 96 and 97);
  - a warning that health and safety law already applies (claim 74);
  - a warning on consumer AI tools and company data (claims 56, 85, 86 and 119).

### What a team pays for AI seats (decision 4)

A plain table in section 7, at list prices checked on 25 November 2026, before VAT, paid annually. The draft rechecks them on the publish date.

| Tool | Per user a month | 10 users a year | 25 users a year | 50 users a year | 100 users a year |
|---|---|---|---|---|---|
| Microsoft 365 Copilot Business (add-on; needs a Microsoft 365 Business plan) | £16.10 standard (£13.80 first-year offer until 31 December 2026) | £1,932 | £4,830 | £9,660 | £19,320 |
| ChatGPT Business, standard seat | US$20 (no pound price published) | US$2,400 | US$6,000 | US$12,000 | US$24,000 |
| Claude Team, standard seat | US$20 (no pound price published) | US$2,400 | US$6,000 | US$12,000 | US$24,000 |
| Google Workspace Business Standard (the whole suite, Gemini included) | £11.80 | £1,416 | £3,540 | £7,080 | £14,160 |

Sources: claims 54 and 55; annual totals are our arithmetic [D]. The table sits beside DSIT's finding that the real cost is staff time to implement (claim 28) and that 47% of AI users spent nothing (claim 57), so seat prices aren't mistaken for the whole bill.

**On an interactive calculator (Nikita's question).** Recommendation: not for this article. A static table gives the same answer.
- **The spec already parks it.** It lists a "Value calculator (wanted, post-MVP)" under non-goals for the launch, and the article components are deliberately free of client JavaScript.
- **Seat cost is one multiplication.** Four team sizes in a table show the whole range, and readers can scale from there.
- **The costs that matter can't be sourced.** Implementation time, integration and support have no published figures, so a calculator would either leave out the real cost or run on invented assumptions, which the content rules forbid.
- **Prices change.** A dated table is easy to recheck; a calculator hides its inputs.

The AI seat cost is a good candidate for the post-MVP value calculator, once there's sourced data on implementation effort to go with it.

## Open questions for Nikita

None outstanding. The first round's eight questions are answered in "Decisions" below. The draft will mark with NIKITA comments the passages built on his notes, and those resting on our judgement (decision 7).

## Decisions (Nikita, 26 November 2026)

1. **MTC material:** use both, as it's all public. Nikita wasn't involved in the robot system tested in the HVM Catapult report (claims 25 and 26). He proposed the Trustworthy AI whitepaper project at the MTC and contributed a little to its delivery and research (claim 71). He added the MTC's AI governance whitepaper (https://www.the-mtc.org/insights/ai-governance, 20 November 2023) as a source. Both whitepapers were read on 26 November 2026 at Nikita's request: the trustworthy AI PDF by text extraction, and the governance PDF (text stored as vector shapes) by rendering its pages as images with PyMuPDF, installed for the purpose and then removed. The article links to their landing pages. Nikita is a named co-author of the trustworthy AI paper (p.2), not of the governance paper (p.5).
2. **Title:** "Practical AI for Industry: What It Is and Where It Adds Value".
3. **Concerns:** don't tackle every concern from the issue explicitly; group them. The priority is explaining what AI is and where it adds value in industry. The outline was reweighted to match.
4. **Prices:** include real prices, scaled up to show what a team would pay. Nikita asked whether an interactive calculator is worth it; the answer and the team table are under "Visuals".
5. **Funding:** no deadlines in the article. Readers later may skip organisations whose deadline has passed, and new rounds will open. Name the programmes and what they offer.
6. **MIT NANDA:** cite the third-party copy and say that's what it is.
7. **Nikita's notes:** draft both observations as his view, with the evidence beside them, as proposed. Also look for figures on how many firms provide approved tools such as Copilot against staff bringing their own. Nikita remembers a claim that most employees secretly used unapproved tools like ChatGPT when only Copilot was allowed, but not its source.
8. **Agentic AI:** its own section, because of the hype. Say there's little evidence of adoption yet, and look internationally for examples.
9. **"Shadow AI":** use the term in the article, defined on first use as staff using AI tools their employer hasn't approved. The NCSC treats it as a form of shadow IT (claim 85).
10. **No disclosure lines** on the MTC papers in the article (Nikita, 26 November 2026).
