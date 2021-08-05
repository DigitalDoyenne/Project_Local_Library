function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let numBooksBorrowed = 0;
  books.forEach(book => {
    if (!book.borrows[0].returned) numBooksBorrowed++;
  });
  return numBooksBorrowed;
}

//create a helper function to sort genres  
function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    }
    return 0;
  })
}

function getMostCommonGenres(books) {
  let countObj = books.reduce((acc, {
    genre
  }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  let sortedKeys = _sortObjectByValues(countObj);
  let sorted = sortedKeys.map((key) => ({
    name: key,
    count: countObj[key]
  })).slice(0, 5);
  return sorted;
}

function getMostPopularBooks(books, count = 5) {
  //create a list of books organized by title and number of borrows
  const borrows = books.map(book => ({
    name: book.title,
    count: book.borrows.length
  }));
  // then sort by borrow count, in descending order
  borrows.sort((borrowA, borrowB) => borrowB.count - borrowA.count);
  // return top five list
  return borrows.slice(0, count);
}

function getMostPopularAuthors(books, authors) {
  const tally = books.reduce((acc, book) => {
    let borrowed = book.borrows.length;
    if (acc[book.authorId] === undefined) {
      acc[book.authorId] = 0;
    }
    acc[book.authorId] += borrowed;
    return acc;
  }, {});
  const popular = Object.keys(tally)
    .map((key) => {
      console.log(key, typeof key);
      let author = authors.find((author) => author.id == key);
      return {
        name: `${author.name.first} ${author.name.last}`,
        count: tally[key],
      };
    })
    .sort((bookA, bookB) => {
      if (bookA.count > bookB.count) {
        return -1;
      } else {
        return 1;
      }
    })
    .slice(0, 5);
  return popular;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};