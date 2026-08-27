# Native adaptation

How a native session adapts, including personality swaps.

## Native adaptation

The host roster supports two context-only adaptations for an unwarded native
agent in a directly steered interactive session. An inferred role may switch,
and any active role may temporarily adopt a different catalog personality
boundary. Neither behavior changes executable authority.

### Shared eligibility

Both policies require certain live interaction. They are unavailable in a
Ward-bound, composed, staged, containerized, headless, unattended, long-burn,
or async session. They are also unavailable while an explicit slash goal is
active.

The generated roster lists every valid native role target from the selected
person package. Roles without a named seat stay outside that list.

### Inferred role switches

At session start, the agent records whether its role was assigned by a caller
or inferred from the initial substantive request. Only an inferred role may
switch.

An explicit user request naming a valid target, such as `swap into eval`,
activates `eval` without another confirmation. The agent loads the target role
skill and every skill in its complete ordered personality meld before acting.
Role methods become eligible only when the new role and task both match. The agent
announces the new role, and stops following the prior charter. The new role remains inferred, so
another explicit request may switch again or return to an earlier role. The
current selection lasts until the next explicit switch or session end.

When the agent proposes a role switch, it names the target and reason, then
asks a separate confirmation:

> This task would benefit from the <role> role because <reason>. Should the
> agent switch to it now?

The agent waits for an explicit yes. An unknown target fails with the valid
role slugs so the user can correct the request.

### Caller-assigned roles

A caller-assigned role remains fixed. The agent rejects a role-switch request
and directs the caller to launch a new bundle with the different role.
Native bundles materialize only the assigned role skill, role methods, and boundary.
Compiled bundles inline those same selected bodies, which preserves this boundary.

### Personality-only swaps

The agent may propose a goal-fit catalog personality or meld when it would
materially improve the current task. It names the candidate and reason, then
asks a separate question:

> This task would benefit from the <X> persona because <reason>. Should the
> agent swap to it now?

The original task request does not count as confirmation. The agent waits for
an explicit yes before loading every newly active definition and announcing
the temporary swap. A decline keeps the current boundary.

Confirmation covers only the current task. Task completion restores the
role's default meld, and every later personality swap needs a new proposal and
confirmation. Personality adaptation never changes the active role.

### Authority boundary

A native role switch changes only the active charter and personality meld. A
personality swap changes only the boundary. The harness, model, tools, permissions,
credentials, obligations, and executable authority remain unchanged.

The eval seat remains read-only around running backends unless runtime policy explicitly
grants an enforced disposable fixture mode. A role or personality switch does
not create, retain, or broaden that authority.

## Native personality swaps

Personality-only swaps now live inside the broader
[native adaptation contract](native-adaptation.md), alongside explicit role
switching for eligible inferred native roles.
