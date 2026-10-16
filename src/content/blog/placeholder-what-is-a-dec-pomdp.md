---
# PLACEHOLDER POST: replace or delete this file.
title: 'Placeholder: What Is a Dec-POMDP?'
date: 2026-07-04
description: A short placeholder primer on decentralized partially observable MDPs.
tags: [marl, reinforcement learning]
---

_This is a placeholder post._

A **decentralized partially observable Markov decision process** (Dec-POMDP)
is a tuple

$$
\langle \mathcal{I}, \mathcal{S}, \{\mathcal{A}_i\}, T, R, \{\Omega_i\}, O, h \rangle,
$$

where a team of agents $i \in \mathcal{I}$ shares a single reward $R$ but each
agent only sees its own observation $o_i \in \Omega_i$. Each agent therefore
acts on its local history $\tau_i$, and the team seeks a joint policy
$\pi = (\pi_1, \dots, \pi_n)$ maximizing expected return.

Solving finite-horizon Dec-POMDPs optimally is NEXP-complete, which is one
reason centralized training with decentralized execution is so popular.
