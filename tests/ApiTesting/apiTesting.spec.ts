import {test, expect} from '@playwright/test'


let response;
let responseBody;

test ("get users", async({request}) => {

    response = await request.get("https://reqres.in/api/users/2");
    responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(2)
    console.log(responseBody.data.id)
    expect(responseBody.data.first_name).toBe("Janet")
    console.log(responseBody.data.first_name)
    expect(responseBody.data.email).toBe("janet.weaver@reqres.in")
    console.log(responseBody.data.email)
})

/**
 * yukarıda basit bir api testi yaptık. öncelikle standart olarak importları oluşturup global bir
 * response ve responseBody tanımladım. test bloğu içinde response değişkenine get request ile 
 * gideceğimiz ücretsiz "reqres.in" adresinden url ve pathini aldık. 
 */