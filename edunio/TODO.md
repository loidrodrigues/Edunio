# TODO for Updating Mentor Dashboard with Real Data

- [ ] Update app/mentor/dashboard/page.tsx to fetch real data instead of using mock data:
  - Fetch mentor user profile from API using user ID from token.
  - Fetch pending lesson requests for mentor from lesson-requests API.
  - Fetch lessons for mentor from lessons API.
  - Replace mockSolicitations, mockLessons, and mockUser with fetched data in state.
  - Remove mock data constants from the file.
- [ ] Test the dashboard to ensure real data is displayed correctly.
- [ ] Verify that accept/reject actions update the backend and UI properly.
- [ ] Verify profile editing saves changes to backend.
- [ ] Perform any necessary error handling and loading states.

Next steps:

- Implement the above changes step-by-step.
- Test after implementation.
