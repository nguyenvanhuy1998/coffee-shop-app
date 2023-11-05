export const getCategoriesFromData = (data: any) => {
  // Lọc ra một object chứa số lượng tương ứng với mỗi danh mục
  // KQ: temp {"Americano": 3, "Black Coffee": 3, "Cappucchino": 3, "Espresso": 3, "Latte": 3, "Macchiato": 3}
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  // Chuyển đổi object sang array theo keys và thêm phần tử "All" đầu mảng
  // KQ: ["All", "Americano", "Black Coffee", "Cappucchino", "Espresso", "Latte", "Macchiato"]
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};
export const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};
