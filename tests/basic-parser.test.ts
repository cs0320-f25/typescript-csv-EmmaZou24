import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const DOUBLEQUOTECOMMA_CSV_PATH = path.join(__dirname, "../data/doublequotecomma.csv");
const DOUBLEQUOTE_CSV_PATH = path.join(__dirname, "../data/doublequote.csv");
const NUMBERS_CSV_PATH = path.join(__dirname, "../data/numbers.csv");
const BASIC_PEOPLE_CSV_PATH = path.join(__dirname, "../data/basicpeople.csv");
const ESCAPED_CSV_PATH = path.join(__dirname, "../data/escaped.csv");
const EMPTYFIELDS_CSV_PATH = path.join(__dirname, "../data/emptyfields.csv");


test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV obeys double quotes (w/o commas)", async () => {
  const results = await parseCSV(DOUBLEQUOTE_CSV_PATH, undefined);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["Doe", "Jane", "I love CS"]);
  expect(results[1]).toEqual(["Doe", "John", "I hate CS"]);
  expect(results[2]).toEqual(["Smith", "Adam", "CS 320"]);
})

test("parseCSV obeys double quotes with commas inside", async () => {
  const results = await parseCSV(DOUBLEQUOTECOMMA_CSV_PATH, undefined);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["Doe", "Jane", "I, love, CS"]);
  expect(results[1]).toEqual(["Doe", "John", "I, hate, CS"]);
  expect(results[2]).toEqual(["Smith", "Adam", "CS, 320"]);
})

test("parseCSV obeys escaped quotes within fields", async () => {
  const results = await parseCSV(ESCAPED_CSV_PATH, undefined);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["Doe", "Jane", "\"I love CS\", she said"]);
  expect(results[1]).toEqual(["Doe", "John", "He exclaimed \"I hate CS!\""]);
  expect(results[2]).toEqual(["Smith", "Adam", "He chose \"CS 320\" at last"]);
})

test("parseCSV allows empty fields", async () => {
  const results = await parseCSV(EMPTYFIELDS_CSV_PATH, undefined);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["apple", "20", "1.2", "minnesota"]);
  expect(results[1]).toEqual(["pear", "13", "4.1", ""]);
  expect(results[2]).toEqual(["orange", "", "5.8", "massachusetts"]);

  //with a permissive schema that allows undefined fields
  const schema = z.tuple([
    z.string().optional(), z.coerce.number().optional(), z.coerce.number().optional(), z.string().optional()
  ]).transform(tup => ({fruit: tup[0], num: tup[1], float: tup[2], state: tup[3]}));
  const schema_results = await parseCSV(EMPTYFIELDS_CSV_PATH, schema);
  expect(schema_results).toHaveLength(3);
  expect(schema_results[0]).toEqual({fruit:"apple", num:20, float:1.2, state:"minnesota"});
  expect(schema_results[1]).toEqual({fruit:"pear", num:13, float:4.1, state:undefined});
  expect(schema_results[2]).toEqual({fruit:"orange", num:undefined, float:5.8, state:"massachusetts"});
})

/////////////////////////

test("parseCSV with tuple schema", async () => {
  //Schema
  const schema = z.tuple([
    z.string(), //name
    z.coerce.number(), //age
  ]).transform(tup => ({name: tup[0], age: tup[1]}));

  const results = await parseCSV(BASIC_PEOPLE_CSV_PATH, schema);
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual({name: "Alice", age: 23});
  expect(results[1]).toEqual({name:"Bob", age: 30});
  expect(results[2]).toEqual({name:"Charlie", age: 25});
  expect(results[3]).toEqual({name:"Nim", age: 22});
  expect(results[4]).toEqual({name: "Nom", age: 100});
})

test("parseCSV with an improperly formatted CSV", async () => {
  //Schema
  const schema = z.tuple([
    z.string(), //name
    z.coerce.number(), //age
  ]).transform(tup => ({name: tup[0], age: tup[1]}));

  await expect(parseCSV(PEOPLE_CSV_PATH, schema)).rejects.toThrow();
  // const results = await parseCSV(PEOPLE_CSV_PATH, schema);
  
})

test("parseCSV with different schemas, same CSV", async () => {
  const schema1 = z.tuple([
    z.string().optional(), z.coerce.number().optional(), z.coerce.number().optional(), z.string().optional()
  ]).transform(tup => ({fruit: tup[0], nums: [tup[1], tup[2]], state: tup[3]}));
  const schema_results = await parseCSV(EMPTYFIELDS_CSV_PATH, schema1);
  expect(schema_results).toHaveLength(3);
  expect(schema_results[0]).toEqual({fruit:"apple", nums:[20, 1.2], state:"minnesota"});
  expect(schema_results[1]).toEqual({fruit:"pear", nums:[13, 4.1], state:undefined});
  expect(schema_results[2]).toEqual({fruit:"orange", nums:[undefined, 5.8], state:"massachusetts"});

  const schema2 = z.tuple([
    z.string().optional(), z.coerce.number().optional(), z.coerce.number().optional(), z.string().optional()
  ]).transform(tup => ({fruit: tup[0], num: tup[1], float: tup[2], state: tup[3]}));
  const schema_results2 = await parseCSV(EMPTYFIELDS_CSV_PATH, schema2);
  expect(schema_results2).toHaveLength(3);
  expect(schema_results2[0]).toEqual({fruit:"apple", num:20, float:1.2, state:"minnesota"});
  expect(schema_results2[1]).toEqual({fruit:"pear", num:13, float:4.1, state:undefined});
  expect(schema_results2[2]).toEqual({fruit:"orange", num:undefined, float:5.8, state:"massachusetts"});
})

test("parseCSV with refined schema", async () => {
  const schema = z.tuple([
    z.string(), //name
    z.coerce.number().refine(num => num<50), //age less than 50
  ])
  await expect(parseCSV(BASIC_PEOPLE_CSV_PATH, schema)).rejects.toThrow();
})