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
    
        - (From LLM) (Extensibility) As a user, I will input data from CSV's that may come directly from online databases and/or may be too big to manually check for missing fields and differently-lengthed rows. Using the parser, I will be able to see if an error occurs, and the cause of it.
        - (From me) (Functionality) As a user, I will input data that may include columns containing text / narrative data, which in turn might contain commas. I will be able to put that narrative data into quotes and use the parser to parse each narrative as one item.
        - (From both) (Extensibility) As a user, I will input CSV data where the first row is a "header" row, and expect some form of separation between the headers and the actual data rows when I parse my CSV.
        - (From both) (Extensibility) As a user, I want my CSV data to be parsed into an object type that I specify, with fields corresponding to each data field in each row. I want the parser to work even when I want to parse the same CSV into different object types.

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

        My initial ideas were primarily based on my knowledge of basic CSV functionality (and personal experience dealing with them), as well as the specifications in the class handouts. Prompting the LLM gave me some more insight into the possible edge cases of CSV handling, such as empty/missing fields and escaped characters within quotes. Since I am not the most familiar with CSV's and definitely not familiar with their exact specifications, this information from the LLM was quite useful. However, the LLM also tended to give me irrelevant information about CSV handling that should really be handled by the user, such as data import/export and using different delimiters (which goes into the realm of TSV's and such). I noticed that the answers tended to go off topic more when I asked about CSV functionality for users, versus when I specifically asked about possible edge cases.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
N/A

#### Tests:
I included tests to ensure that the parser...
- Recognizes quoted fields and ignores commas within
- Recognizes escaped quotes within quoted fields (which use double double-quotes to escape) and represents them using the Typescript method for escaping quotes (using a slash) after parsing
- Works on empty fields and represents them as an empty string (""). I tested this using both the default list of lists return value, and with a schema that would map empty fields to "undefined".
- Works with a basic tuple schema
- Throws an appropriate error when passed a schema and a CSV that has fields not following the schema's specifications
- Works with two different schemas on the same CSV, and returns the appropriate types when parsing
- Throws an appropriate error when passed a schema with refinements that the CSV fields don't fulfill

#### How To…
Run tests with "npm run test".

#### Team members and contributions (include cs logins):
N/A

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
No collaborators (except Copilot)

#### Total estimated time it took to complete project:
4-5 hours

#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-EmmaZou24