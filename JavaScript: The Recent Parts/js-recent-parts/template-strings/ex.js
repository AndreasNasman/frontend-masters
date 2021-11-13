function upper(strings, ...values) {
  let result = "";

  for (const [index, string] of strings.entries()) {
    const value = values[index] ?? "";
    result += `${string}${value.toUpperCase()}`;
  }

  return result;
}

var name = "kyle",
  twitter = "getify",
  topic = "JS Recent Parts";

console.log(
  upper`Hello ${name} (@${twitter}), welcome to ${topic}!` ===
    "Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);
