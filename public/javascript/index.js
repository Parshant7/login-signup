$(document).ready(function() {
    // signup    
    $('.signup').submit( async function(e){
        e.preventDefault();
        const form = document.querySelector('form');
        console.log($("input[name='isExperienced']:checked").val());
        console.log("hello signup"); 

        // reset errors
        $("nameError").text('');
        $("passwordError").text('');
        $("confirmPasswordError").text('');

        // get values
        const formData = {
            name: form.name.value,
            email : form.email.value,
            password: form.password.value,
            confirmPassword: form.confirmPassword.value
        }

        try {
            const res = await fetch('/signup', { 
                method: 'POST', 
                body: JSON.stringify(formData),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data);
            // if (data.errors) {
            //     console.log(data);
            //     $(".fname.error").text(data.errors.fname);
            //     $(".dob.error").text(data.errors.dob);
            //     $(".gender.error").text(data.errors.gender);    
            //     $(".mobile.error").text(data.errors.mobile);
            //     $(".standard.error").text(data.errors.standard);
            //     $(".email.error").text(data.errors.email);
            //     $(".password.error").text(data.errors.password);
            // }

            // if (data.suc) {
            //     location.assign('/');
            // }
            
        }
        catch (err) {
            console.log(err);
        }
    
    });

    // login
    $('.login').submit( async function(e){
        e.preventDefault();
        const form = document.querySelector('form');
        // reset errors
        $('.email.error').text('');
        $('.password.error').text('');
        // get values
        const email = form.email.value;
        const password = form.password.value;
        console.log("hello");
        try {
            const res = await fetch('/auth/login', { 
                method: 'POST', 
                body: JSON.stringify({ email, password }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log("this is data", data);

            if (data.ResponseStatus) {
                // for (error of data.errors){
                //     let path = error.path;
                //     let string = `.${path}.error`;
                //     console.log(string, $(string));
                //     $(string).text(error.msg);
                // }
                location.assign('/auth/home');
            }
            else{
                location.assign('/auth/home');
            }
        }
        catch (err) {
            console.log(err);
        }
    });

    $(".likeButton").click( async function(e){
        e.preventDefault();
        var productId = $(this).data('product');

        try {
            const res = await fetch('/auth/likeProduct', { 
                method: 'PUT', 
                body: JSON.stringify({ productId }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
        
    })
});