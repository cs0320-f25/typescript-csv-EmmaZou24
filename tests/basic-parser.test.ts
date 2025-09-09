import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const DOUBLEQUOTECOMMA_CSV_PATH = path.join(__dirname, "../data/doublequotecomma.csv");
const DOUBLEQUOTE_CSV_PATH = path.join(__dirname, "../data/doublequote.csv");
const NUMBERS_CSV_PATH = path.join(__dirname, "../data/numbers.csv");


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
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV obeys double quotes (w/o commas)", async () => {
  const results = await parseCSV(DOUBLEQUOTE_CSV_PATH);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["Doe", "Jane", "I love CS"]);
  expect(results[1]).toEqual(["Doe", "John", "I hate CS"]);
  expect(results[2]).toEqual(["Smith", "Adam", "CS 320"]);
})

test("parseCSV obeys double quotes with commas inside", async () => {
  const results = await parseCSV(DOUBLEQUOTECOMMA_CSV_PATH);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["Doe", "Jane", "I, love, CS"]);
  expect(results[1]).toEqual(["Doe", "John", "I, hate, CS"]);
  expect(results[2]).toEqual(["Smith", "Adam", "CS, 320"]);
})

// test("parseCSV casts numbers as numbers", async () => {
//   const results = await parseCSV(NUMBERS_CSV_PATH);
//   expect(results).toHaveLength(3);
//   expect(results[0]).toEqual(["red", "rose", "3"]);
//   expect(results[1]).toEqual(["blue", "lily", "10"]);
//   expect(results[2]).toEqual(["thirty", "grapefruit", "40"]);
// })