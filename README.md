# theScore "the Rush" Interview Challenge

At theScore, we are always looking for intelligent, resourceful, full-stack developers to join our growing team. To help us evaluate new talent, we have created this take-home interview question. This question should take you no more than a few hours.

**All candidates must complete this before the possibility of an in-person interview. During the in-person interview, your submitted project will be used as the base for further extensions.**

### Why a take-home challenge?

In-person coding interviews can be stressful and can hide some people's full potential. A take-home gives you a chance work in a less stressful environment and showcase your talent.

We want you to be at your best and most comfortable.

### A bit about our tech stack

As outlined in our job description, you will come across technologies which include a server-side web framework (like Elixir/Phoenix, Ruby on Rails or a modern Javascript framework) and a front-end Javascript framework (like ReactJS)

### Challenge Background

We have sets of records representing football players' rushing statistics. All records have the following attributes:

- `Player` (Player's name)
- `Team` (Player's team abbreviation)
- `Pos` (Player's postion)
- `Att/G` (Rushing Attempts Per Game Average)
- `Att` (Rushing Attempts)
- `Yds` (Total Rushing Yards)
- `Avg` (Rushing Average Yards Per Attempt)
- `Yds/G` (Rushing Yards Per Game)
- `TD` (Total Rushing Touchdowns)
- `Lng` (Longest Rush -- a `T` represents a touchdown occurred)
- `1st` (Rushing First Downs)
- `1st%` (Rushing First Down Percentage)
- `20+` (Rushing 20+ Yards Each)
- `40+` (Rushing 40+ Yards Each)
- `FUM` (Rushing Fumbles)

In this repo is a sample data file [`rushing.json`](/rushing.json).

##### Challenge Requirements

1. Create a web app. This must be able to do the following steps

   1. Create a webpage which displays a table with the contents of [`rushing.json`](/rushing.json)
   2. The user should be able to sort the players by _Total Rushing Yards_, _Longest Rush_ and _Total Rushing Touchdowns_
   3. The user should be able to filter by the player's name
   4. The user should be able to download the sorted data as a CSV, as well as a filtered subset

2. The system should be able to potentially support larger sets of data on the order of 10k records.

3. Update the section `Installation and running this solution` in the README file explaining how to run your code

### Submitting a solution

1. Download this repo
2. Complete the problem outlined in the `Requirements` section
3. In your personal public GitHub repo, create a new public repo with this implementation
4. Provide this link to your contact at theScore

We will evaluate you on your ability to solve the problem defined in the requirements section as well as your choice of frameworks, and general coding style.

### Help

If you have any questions regarding requirements, do not hesitate to email your contact at theScore for clarification.

### Installation and running this solution

#### Installation

##### Server

###### Pre Requirements

- Ruby 2.5.0 or newer
- Rails 6.0
- Bundler
- Gem

###### To Install

1. If you do not have the newest version or ruby use either `rbenv install 2.7.1 && rbenv global 2.7.1`
   or `rvm install 2.7.1 && rvm use 2.7.1`
2. `gem update rails` to install the latest version is correctly 6.0
3. Make sure you are in the project's root directory
4. Go to `cd server` directory
5. Run `bundle`
6. Run `rails db:migrate`
7. Run `rails db:seed`

###### Usage

Rails server is running on `http://localhost:3000`
_Please note: Rails is a API server only_

From the 'server' directory

- To run the server use the command `rails s`
- To run the test with code coverage use the commend `rspec`
  - To open code coverage in the 'server' directory type `open coverage/index.html`
- To add 10,000 more players run `rails db:seed:league` or `rails db:seed:league[any number of players]`
  - If you are using Zsh you will need to use `\[` and `\]` around the arguments as it does parse rails
    task correctly for example `rails db:seed:league\["10"\]`

##### Frontend

###### Pre Requirements

- Have `yarn` installed

###### To Install

1. In the terminal make sure you are in the project's root directory
2. Go to `cd frontend` directory
3. Run `yarn`
4. Run `cp .env.example .env`

###### Usage

Frontend is running on `http://localhost:8080`, you can vist the app once `yarn start`
is turn on.

From the 'frontend' directory

- To run the frontend use the commend `yarn start`
- To run the test with code coverage use the commend `yarn test`
  - To open code coverage in the 'frontend' directory type `open coverage/lcov-report/index.html`
- To run the test in watch mode use the commend `yarn test:watch`
