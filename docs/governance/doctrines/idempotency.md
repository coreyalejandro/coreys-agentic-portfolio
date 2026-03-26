# THE IDEMPOTENCY DOCTRINE
## Full Text | TLC Constitutional Doctrine

> **Idempotency** (noun, mathematics): The property where applying a function multiple times produces the same result as applying it once. `f(f(x)) = f(x)`.

This is a constitutional doctrine. It is not confined to one Article — it governs the entire Commonwealth.

## What It Means

**Do it once. Do it again. Same result.** No hidden state. No side effects. No "it worked the first time but broke the second time." If something cannot survive being run twice and producing the same outcome, it is not safe.

## Where It Applies

| Context | Idempotency Rule |
|---------|-----------------|
| **Instructions** | Follow the same steps twice → same outcome. If a tutorial breaks on the second run, the tutorial is wrong — not the user. |
| **Code** | Execute the same function twice → same state. No mutation. No side effects. This is why Article II mandates immutability. |
| **Deployments** | Deploy the same artifact twice → same system. No drift. |
| **V&T Statements** | Check the same work twice → same truth. The truth does not change when you look again. |
| **Recovery (SOP-013)** | Pause and resume twice → same safe state. No data lost. No context lost. |
| **Amendments (Article V)** | Apply the same lesson twice → no double-mutation. The rule is already there. |
| **Agent Actions** | Send the same command to an agent twice → same result. No duplicate commits. No double-deploys. |

## Why This Matters for the Default User

Idempotency is the mathematical guarantee that **the user cannot break things by trying again.** For a neurodivergent user with OCD-driven doubt loops, ADHD-driven restarts, or manic-episode-driven repetition — this is not a nice-to-have. It is the difference between a safe system and a dangerous one.

If the user runs a step again because they weren't sure it worked: **same result.** Not an error. Not a duplicate. Not a mess to clean up. Same result. Every time.
