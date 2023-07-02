use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt").expect("File not found");

    let counts = contents
        .split("\n\n")
        .map(|chunk| -> usize { chunk.split("\n").map(|row| row.parse().unwrap_or(0)).sum() });

    let mut values = counts.collect::<Vec<_>>();
    values.sort();
    values.reverse();

    let mut top_three: Vec<_> = values.iter().take(3).collect();
    let sum_top_three = top_three.iter().fold(0, |mut sum, &val| {
        sum += val;
        sum
    });

    println!("Highest value: {:?}", values[0]);
    println!("Top 3: {:?}", sum_top_three);
}
