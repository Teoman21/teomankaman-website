---
title: 'When to Communicate: Belief Distributions and KL Divergence for Principled Gating in Multi-Agent RL'
authors:
  - Teoman Kaman
venue: arXiv preprint
year: 2026
status: preprint
links:
  pdf: https://arxiv.org/pdf/2608.14559
  arxiv: https://arxiv.org/abs/2608.14559
abstract: >-
  Effective communication in multi-agent reinforcement learning requires agents
  to decide not only what to communicate, but when? Existing approaches either
  communicate at every timestep or learn a binary gate through REINFORCE policy
  gradients (Singh et al., 2019), a high-variance signal that produces unstable
  and uninterpretable gating behavior. I propose a principled alternative: agents
  communicate only when the KL divergence between their learned belief
  distributions exceeds a fixed threshold. Each agent maintains a belief
  distribution over a latent world state computed as a softmax over its LSTM
  hidden state, and communicates only when belief disagreement is large enough to
  justify information exchange. I evaluate this approach on the Predator-Prey
  benchmark from IC3Net (Singh et al., 2019) across two environment sizes with 5
  seeds each, and on MPE simple_spread (Lowe et al., 2017), comparing against
  IC3Net, CommNet, and an independent controller. On PP 10×10, IC3Net outperforms
  KL-belief at all thresholds. On the harder PP 20×20, a threshold ablation over
  ε ∈ {0.1, 0.3, 0.5, 1.0} reveals an inverted U-shape: ε = 0.5 achieves 73.84
  average steps and 42% success rate versus IC3Net's 75.31 steps and 31%, a gap
  of 1.47 steps and 11 percentage points with tighter seed variance. On MPE, the
  belief head improves mean reward by 12 points and reduces variance by 26× even
  when gating is inactive, suggesting two orthogonal contributions: principled
  gating when beliefs can converge, and improved latent representations that
  benefit coordination regardless.
featured: true
---
