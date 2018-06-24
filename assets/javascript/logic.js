    
        function deleteRow() {
            $("table tbody").find('input[name="record"]').each(function(){
                if($(this).is(":checked")){
                    $(this).parents("tr").remove();
                }
            });
    
        }



    $(document).ready(function(){

        $(".add-row").click(function(){
            var tname = $("#tname").val().trim();

            var dest = $("#dest").val().trim();

            var firstTrainTime = $("#first-train").val().trim();

            var frequency = $("#frequency").val().trim();
            
            var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + tname + "</td><td>" + dest + "</td>    <td>" +  firstTrainTime +  "</td>   <td>" + frequency + "</td>  <td>" + "Minutes Away" + "</td>  </tr>";

            $("table tbody").append(markup);
        });
        



        // Find and remove selected table rows
        $(".delete-row").click(function(){

                deleteRow();
           });
        });






