# TaskRail Redesign - Implementation Plan (Phase 2 UI Overhaul)

## Goal
Transform the single-page demo into "TaskRail", a dashboard-style application with a sidebar, multiple views, and a richer login experience.

## New UI Structure
- **Layout**: Sidebar (Left) + Main Content (Right).
- **Views**:
    1.  **Home**: Welcome message, Mock Metrics (Tasks Done: 12, Earned: $1200), Wallet Balance.
    2.  **Tasks**:
        -   *Tab 1: All Tasks* (6 Dummy Tasks, unclickable).
        -   *Tab 2: My Tasks* (Pending [2 dummy], Unclaimed [The Real Demo Flow], Completed [Paid dummy]).

## Proposed Changes

### 1. Structure & Branding
- **Rename**: Change "Micro Marketplace" to "TaskRail".
- **Motto**: "Complete tasks, get paid instantly. Onboardable for everyone, No seed phrases, no gas fees."

### 2. Components

#### [NEW] [components/DashboardLayout.tsx](file:///c:/Users/LazyGenius/Documents/Projects/bounties/lazor-kit-bounty/components/DashboardLayout.tsx)
- Sidebar with navigation state (`view`: 'HOME' | 'TASKS').
- User Profile section in sidebar (Mock Username + Logout).
- Main content area wrapper.

#### [MODIFY] [components/Logo.tsx](file:///c:/Users/LazyGenius/Documents/Projects/bounties/lazor-kit-bounty/components/Logo.tsx)
- Create a new reusable Logo component for TaskRail.

#### [MODIFY] [components/LoginButton.tsx](file:///c:/Users/LazyGenius/Documents/Projects/bounties/lazor-kit-bounty/components/LoginButton.tsx)
- Enhance UI to look more like a "Sign In Form" (centered, maybe a username input mock).

#### [MODIFY] [components/DemoFlow.tsx](file:///c:/Users/LazyGenius/Documents/Projects/bounties/lazor-kit-bounty/components/DemoFlow.tsx)
- **Major Refactor**:
    -   If `!isConnected`: Show the new "Login Page" design.
    -   If `isConnected`: Render `DashboardLayout`.
    -   Move the original "Task Logic" (Claim/Submit) into the "My Tasks -> Unclaimed" tab view.

#### [NEW] [components/views/HomeView.tsx](file:///c:/Users/LazyGenius/Documents/Projects/bounties/lazor-kit-bounty/components/views/HomeView.tsx)
- Stats Cards: Tasks Done (12), Total Earned ($1200), Wallet Balance (100 + Demo Reward).

#### [NEW] [components/views/TasksView.tsx](file:///c:/Users/LazyGenius/Documents/Projects/bounties/lazor-kit-bounty/components/views/TasksView.tsx)
- Tabs: "Explore Tasks" vs "My Tasks".
- Sub-tabs for My Tasks: "Pending", "Unclaimed" (Real Demo), "Completed".

### 3. State Management
- Lift state up to `DemoFlow` or a new Context to manage the "Task" status (Claimed/Paid) so it persists when switching tabs.
- Add `isPro` state to track subscription status.

## Phase 3: Pro Subscription (New)

### 1. Subscription Flow
- **Benefits View**: Detail Pro perks (More tasks, Faster review, Support).
- **Billing Transaction**: Use Lazorkit to simulate building a recurring billing permission (Memo tx: "TaskRail: Subscribed to Pro").

### 2. UI Persistence
- **Sidebar**: Change "Upgrade" button to a "PRO" badge once subscribed.
- **Tasks View**: Increase dummy task count from 6 to 12 upon `isPro` status.
