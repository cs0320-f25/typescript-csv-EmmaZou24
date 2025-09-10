import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const DOUBLEQUOTECOMMA_CSV_PATH = path.join(__dirname, "../data/doublequotecomma.csv");
const DOUBLEQUOTE_CSV_PATH = path.join(__dirname, "../data/doublequote.csv");
const NUMBERS_CSV_PATH = path.join(__dirname, "../data/numbers.csv");
const BASIC_PEOPLE_CSV_PATH = path.join(__dirname, "../data/basicpeople.csv");


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

test("parseCSV with a basic schema and CSV", async () => {
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

// test("parseCSV casts numbers as numbers", async () => {
//   const results = await parseCSV(NUMBERS_CSV_PATH);
//   expect(results).toHaveLength(3);
//   expect(results[0]).toEqual(["red", "rose", "3"]);
//   expect(results[1]).toEqual(["blue", "lily", "10"]);
//   expect(results[2]).toEqual(["thirty", "grapefruit", "40"]);
// })