# FresherNote

[Heroku link][heroku] **Note:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

FresherNote is a web application inspired by Evernote that will be build using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](docs/production_readme.md) -- you'll write this later)
- [ ] Notes
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Notebooks for organizing notes
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Tags for notes
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Rich Text Editing of notes
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Infinite Scroll for Notes

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

# Phase 1: User Authentication, and JSON API (2 days)

**Objective:** Functioning rails project with front-end Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication backend setup
- [ ] create `StaticPages` controller and root view
- [ ] set up webpack & flux scaffold with skeleton files
- [ ] setup `APIUtil` to interact with the API
- [ ] set up flux cycle for frontend auth
- [ ] user signup/signin components
- [ ] blank landing component after signin
- [ ] style signin/signup components
- [ ] seed users

# Phase 2: Flux Architecture, Groups and Joining Groups (2 days)

**Objective:** Groups can be created, read, edited, destroyed, joined, and left through
the API.

- [ ] create `Group` model
- [ ] create memberships join table
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`GroupsController`)
- [ ] jBuilder views for groups
- [ ] test out API interaction in the console.
- implement each note component, building out the flux loop as needed.
  - [ ] `GroupsIndex`
  - [ ] `GroupDetail`
  - [ ] `GroupForm`
- [ ] style groups components


# Phase 3: Events & RSVP's (2 days)

**Objective:** Notes belong to Notebooks, and can be viewed by notebook.

- [ ] create `Event` and `RSVP` models
- build out API, Flux loop, and components for:
  - [ ] Event and RSVP CRUD
  - [ ] adding events requires a group
  - [ ] RSVPs are either confirmed or denied
- [ ] use CSS to style new components
- [ ] seed events

# Phase 4: Calendar and Search by Location and Group Info (1 days)

- [ ] create calendar component that listens to thr `EventStore`
- [ ] implement search for groups with query params
- [ ] Style new elements

# Phase 5: Allow Complex Styling Throughout (1 days)

- [ ] polish styling
- [ ] style components such as `header` and `footer`

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
