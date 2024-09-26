export function extractDate(dateString:any) {
    // Create a Date object from the input string
    const date = new Date(dateString);
  
    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    // Format as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }
  
  