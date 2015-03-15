function Calcuate() {
    var monthInput = $("#monthInput").val() - 1;
    var yearInput = $("#yearInput").val();


    startdate = new Date(yearInput, monthInput);
    startWeight = $("#startWeightInput").val();
    currentWeight = $("#currentWeightInput").val();
    goalWeight = $("#goalWeightInput").val();


    today = new Date();
    today=new Date(today.getFullYear(),today.getMonth());
    if (startdate < today) {
        var weightLost = (startWeight - currentWeight);
        var diffDays = GetDateDiff(startdate, today)
        var ratio = (weightLost / diffDays);

        var daysNeeded = (currentWeight - goalWeight) / ratio;
        var weeksNeeded = Math.ceil(daysNeeded / 7)

        $("#results").fadeIn(1000);
        $("#ratio").text(ratio.toFixed(2));
        $("#weightLost").text(weightLost);
        $("#goal").text(goalWeight);
        $("#weeksNeeded").text(weeksNeeded);
    } else if (startdate==today){
        $("#alertMsg").text("Sorry about this, but in order for this program to work, you need to be losing weight for over a month.");
        $("#alertMsg").fadeIn(1000);
    }else if (startdate > today){
        $("#alertMsg").text("Looks like your from the future. Why are you on this site? Don't you have super fix all pills and VR to make you happy? ");
        $("#alertMsg").fadeIn(1000);
    }


}

function GetDateDiff(date1, date2) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

function GetGoalDate(today, days) {
    var endDate = new Date(today.getTime());
    endDate.setDate(endDate.getDate() + days);
    return endDate;
}

function main() {
    Calcuate();
}


function validateFields() {
    if ($("#startWeightInput").val() != ""
        && $("#currentWeightInput").val() != ""
        && $("#goalWeightInput").val() != ""
        && $("#monthInput").val() != "na"
        && $("#yearInput").val() != "na") {
        $("#submitBtn").prop("disabled", false);
    } else {
        $("#submitBtn").prop("disabled", true);
    }


}

$.fn.isValid = function () {
    return this[0].checkValidity()
}


$(document).ready(function () {
    //Makes sure only numbers can be passed to inputs
    $("#startWeightInput,#currentWeightInput,#goalWeightInput").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
                // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $("input, select").change(function () {
        validateFields();
    });

});



