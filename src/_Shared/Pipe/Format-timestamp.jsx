export function formatTimestamp(timestamp, type='dd-mm-yyyy') {
    // Tạo đối tượng Date từ timestamp
    const date = new Date(timestamp*1000);
  
    // Lấy ngày, tháng, và năm
    const day = String(date.getDate()).padStart(2, '0'); // padStart để đảm bảo 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên cần +1
    const year = date.getFullYear();
  
    // Trả về chuỗi định dạng dd-mm-YYYY
    if(type==="yyyy-MM-dd"){
      return `${year}-${month}-${day}`;
    }
    
    return `${day}-${month}-${year}`;
  }