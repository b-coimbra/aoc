const INPUT: &str = include_str!("input.txt");

fn parse(value: &str) -> i32 {
    value
        .lines()
        .flat_map(|x| x.parse::<i32>())
        .sum()
}

fn main() {
    let chunks = INPUT
        .trim()
        .split("\n\n")
        .map(parse);

    println!("{}", chunks.max().unwrap())
}
