$("#firstins").fadeIn();
$("#floatId").hide();
function bugetRemain() {
  var afteradd = document.querySelectorAll(".amount");
  var x = 0;
  for (var i = 0; i < afteradd.length; i++) {
    y = parseFloat(afteradd[i].textContent);
    x = x + y;
  }
  var disbudgetbal = document.getElementById("displayBudgetAmount").value;
  var budgetremaining = document.getElementById("displayBudgetremain");
  if (disbudgetbal >= x) {
    disbudgetbal = disbudgetbal - x;
    budgetremaining.innerHTML = disbudgetbal + " Rs";
    $("#displayBudgetremain").addClass("text-success");
  } else if (disbudgetbal <= x) {
    disbudgetbal = disbudgetbal - x;
    budgetremaining.innerHTML = disbudgetbal + " Rs";
    $("#displayBudgetremain").addClass("text-danger");
  }
}
function expenseadd() {
  var expenseAmt = document.getElementById("expenseAmt").value;
  var expenseReason = document.getElementById("expenseReason").value;
  var expenseCategory = document.getElementById("expenseCategory").value;

  if (!expenseCategory || !expenseAmt) {
    alert("Input the values of category and expense.");
  } else if (!expenseReason) {
    expenseReason = "N/A";
    listCreator(expenseCategory, expenseAmt, expenseReason);
  } else {
    listCreator(expenseCategory, expenseAmt, expenseReason);
  }
  $("#floatId").show();
}
//Function To Create List
const listCreator = (expenseCategory, expenseAmt, expenseReason) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("list-group-item");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<div class="container">
                                            <div class="row">
                                            <div class="col-md-3 col-4 "><p class="fs-5 category">${expenseCategory}</p></div>
                                            <div class="col-md-3 col-4 "><p class="fs-5 amount">${expenseAmt}<span> Rs</span></p></div>
                                            <div class="col-md-3 col-0 d-none d-md-block "><p class="fs-5 product">${expenseReason}</p></div>
                                            <div class="col-md-3 col-4"><button class="fa-solid fa-pen-to-square edit" style="font-size: 1.2em;" id="editButton"></button><button class="fa-solid fa-trash-can delete" id="deleteButton" style="font-size: 1.2em;"></button> </div>
                                            </div>
                                        </div> `;
  document.getElementById("list").appendChild(sublistContent);
  bugetRemain();
};
$(document).ready(function () {
  $(".MyForm").hide();
  $(".expensepass").hide();
  $(document).on("click", "#budgetAmtYes", function (e) {
    e.preventDefault();
    var budgetAmount = $(document).find("#budgetamt").val();
    var displayBudgetAmount = $(document).find("#displayBudgetAmount");
    var displayAmount = $(document).find("#displayBudgetAmount").val();
    if (budgetAmount != "" || displayAmount != "") {
      $(".MyForm").fadeIn();
      $(".expensepass").fadeIn();
      $("#firstins").hide();
      if (displayAmount == "") {
        displayAmount = parseFloat(budgetAmount);
        displayBudgetAmount.val(parseFloat(displayAmount));
      } else {
        if (budgetAmount == "") {
          budgetAmount = 0;
        }
        displayAmount = parseFloat(displayAmount);
        var totalBudgetAmount = displayAmount + parseFloat(budgetAmount);
        displayBudgetAmount.val(parseFloat(totalBudgetAmount));
        displayBudgetAmount.append("Rs");
      }
    } else {
      alert("Add Budget to start with Expense Tracker!");
      $(".expensepass").fadeOut();
      $(".MyForm").fadeOut();
      $("#firstins").fadeIn();
    }
    bugetRemain();
  });
});
//edit
$(document).on("click", "#editButton", function (e) {
  e.preventDefault();
  $(".btn").prop("disabled", true);
  var button = $(this).parent().parent();
  var parentCateButt = button.find(".category");
  var parentAmtButt = button.find(".amount");
  var parentProButt = button.find(".product");
  var parentYesButt = button.find(".edit");
  var parentNoButt = button.find(".delete");
  var contentcate = '<input autocomplete=off type="text" id="Editedcategory" >';
  var contentamt = '<input autocomplete=off type="number" id="Editedamount" >';
  var contentpro = '<input autocomplete=off type="text" id="Editedproduct" >';
  var contentyes =
    '<button  id="yesEditedproduct" class="fa fa-check" style="font-size: 1.2em;">';
  var contentno =
    '<button  id="noEditedproduct" class="fa-solid fa-times" style="font-size: 1.2em;">';
  parentCateButt.parent().append(contentcate);
  parentAmtButt.parent().append(contentamt);
  parentProButt.parent().append(contentpro);
  parentYesButt.parent().append(contentyes);
  parentNoButt.parent().append(contentno);
  $(".edit").hide();
  parentNoButt.hide();
  //yes for edit
  $(document).on("click", "#yesEditedproduct", function (e) {
    e.preventDefault();
    var button = $(this).parent().parent();
    var EparentCateButt = button.find(".category");
    var EparentAmtButt = button.find(".amount");
    var EparentProButt = button.find(".product");
    var EditedparentCateButt = button.find("#Editedcategory").val();
    var EditedparentAmtButt = button.find("#Editedamount").val();
    var EditedparentProButt = button.find("#Editedproduct").val();
    if (
      EditedparentCateButt != "" ||
      EditedparentAmtButt != "" ||
      EditedparentProButt != ""
    ) {
      if (EditedparentProButt == "") {
        EditedparentProButt = "N/A";
      }
      if (EditedparentCateButt != "") {
        EparentCateButt.text(EditedparentCateButt);
      }
      if (EditedparentAmtButt != "") {
        EparentAmtButt.text(EditedparentAmtButt);
      }
      EparentProButt.text(EditedparentProButt);
      //here comes to submit
      parentCateButt.siblings().remove();
      parentAmtButt.siblings().remove();
      parentProButt.siblings().remove();
      parentYesButt.siblings().hide();
      parentNoButt.siblings().hide();
      $(".edit").show();
      parentNoButt.show();
      $(".btn").prop("disabled", false);
    } else {
      parentCateButt.siblings().remove();
      parentAmtButt.siblings().remove();
      parentProButt.siblings().remove();
      parentYesButt.siblings().hide();
      parentNoButt.siblings().hide();
      $(".edit").show();
      parentNoButt.show();
      $(".btn").prop("disabled", false);
    }
    bugetRemain();
  });
  // no for edit
  $(document).on("click", "#noEditedproduct", function (e) {
    e.preventDefault();
    parentCateButt.siblings().remove();
    parentAmtButt.siblings().remove();
    parentProButt.siblings().remove();
    parentYesButt.siblings().hide();
    parentNoButt.siblings().hide();
    $(".edit").show();
    parentNoButt.show();
    $(".btn").prop("disabled", false);
  });
});
//delete element
$(document).on("click", "#deleteButton", function (e) {
  e.preventDefault();
  var button = $(this).parent();
  var parentButt = button.parent();
  var text = "Want to delete ?";
  if (confirm(text) == true) {
    parentButt.parent().parent().remove();
  }
  bugetRemain();
 
});
$("#displayBudgetAmount, #budgetamt").after("Rs");

//pie chart
function piechart() {
  myHideandSeek();
  var Xxes = document.querySelectorAll(".category");
  var xValues = [];
  for (var i = 0; i < Xxes.length; i++) {
    xValues.push(Xxes[i].textContent);
  }
  const Yyes = {};
  for (const num of xValues) {
    Yyes[num] = Yyes[num] ? Yyes[num] + 1 : 1;
  }
  var yValues = Object.values(Yyes);
  var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];
  uniq = [...new Set(xValues)];
  new Chart("myChart", {
    type: "pie",
    data: {
      labels: uniq,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: { 
      events: [""],
      tooltips: {enabled: false},
    hover: {mode: null},
      title: {
        display: true,
        text: "Mostly Spent on.!",
      },
    },
  });
}
//hide and seek
function myHideandSeek() {
  var x = document.getElementById("myChart");
  var y = document.getElementById("list");
  if (x.style.display === "none" && y.style.display === "block" ) {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
}
