 function findColumnLength(file, callback) {
   // 1 KB at a time, because we expect that the column will probably small.
   var CHUNK_SIZE = 1024;
   var offset = 0;
   var fr = new FileReader();
   fr.onload = function() {
      var view = new Uint8Array(fr.result);
      for (var i = 0; i < view.length; ++i) {
         if (view[i] === 10 || view[i] === 13) {
            // \n = 10 and \r = 13
            // column length = offset + position of \r or \n
            callback(offset + i);
            return;
         }
      }
      // \r or \n not found, continue seeking.
      offset += CHUNK_SIZE;
      seek();
   };
   fr.onerror = function() {
      // Cannot read file... Do something, e.g. assume column size = 0.
      callback(0);
   };
   seek();

   function seek() {
      if (offset >= file.size) {
         // No \r or \n found. The column size is equal to the full
         // file size
         callback(file.size);
         return;
      }
      var slice = file.slice(offset, offset + CHUNK_SIZE);
      fr.readAsArrayBuffer(slice);
   }
}