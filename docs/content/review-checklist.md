# Article review checklist

Nikita ticks this in the article's pull request before merging. Merging publishes the article. The first six lines are the spec's minimum; the rest come from the content workflow ([ADR-0008](../adr/0008-content-workflow-and-checks.md)).

```markdown
## Review checklist

- [ ] Every source link opened and checked: it says what the article says it says
- [ ] No invented numbers: every figure is linked to its source or labelled as an estimate
- [ ] "Would I say this out loud?"
- [ ] No client, MTC or NDA material
- [ ] Images licensed (diagrams are our own SVGs; anything else has its licence in the brief)
- [ ] British English
- [ ] Covers costs, limitations and when not to bother
- [ ] Tools and resources is vendor-neutral, and paid items are labelled
- [ ] Links go to the publisher's page for a document, not the file, wherever one exists
- [ ] Every fact-check flag resolved, or the claim removed
- [ ] Humanizer run after the last edit
- [ ] `reviewed` date set
- [ ] Preview read at phone width
- [ ] Linter (`npm test`) and `npm run check:links` clean, with any "check" links opened by hand
```
