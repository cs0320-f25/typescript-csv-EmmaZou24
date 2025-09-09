# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
- Ability to designate the first row as a "header" row
- Ability to parse rows into objects (pass a schema into the parser)
- Ability to sense and respect double-quoted items that may have commas inside
- Ability to specify and enforce column type? (ex. numbers become numbers, not strings)
- Ability to handle errors if a schema / column type is specified but an item doesn't obey it

- #### Step 2: Use an LLM to help expand your perspective.
PROMPT 1: I'm currently working on a CSV parser function that takes a file as a parameter and parses the CSV. What are edge cases / missing features I should consider while building? What would users of this library (likely other developers) want to use this parser for, and how can the functionality reflect that?
GOOD SUGGESTIONS:
- Different line endings
- Empty fields / missing values
- Variable row lengths (similar to missing values?)
- Escaped characters within quotes
- Error handling for malformed CSV's
POOR/IRRELEVANT SUGGESTIONS:
- Header row (should be handled by the user, or at least not enforced by default)
- Leading/trailing whitespace (probably should be kept, unless specified by the user)

PROMPT 2: I'm working on a CSV parser function. What are possible use cases for this function (based on what real-world developers may do) that I should consider when building this parser?
GOOD SUGGESTIONS:
- Data validation/conversion: although this should be done by the user (to some extent), it would be good to have a system for exceptions
POOR/IRRELEVANT SUGGESTIONS:
- Data import/export (irrelevant to the task of simply parsing, unless users want to specify a specific format to be parsed into)
- Configuration files (not usually relevant for CSV data)
- Bulk user uploads (should be handled by the users, perhaps with a loop / function that calls our parser multiple times)

PROMPT 3: I'm working on a CSV parser function that takes in a file as a parameter. What are the basic functionalities that are expected of such a parser? What are edge cases I should consider when building?
GOOD SUGGESTIONS:
- Possibly return data as arrays/objects
- Optionally treat first row as header
POOR/IRRELEVANT SUGGESTIONS:
- Handle different delimiters (that goes into the territory of TSV and other data types)

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
