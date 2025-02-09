import {test,expect, APIRequest, APIResponse} from '@playwright/test'

test("get an user's information",async({request})=>{
  let response:APIResponse;
  response=await request.get("https://reqres.in/api/users/2");
  let responseBody=await response.json();
  console.log(responseBody);
  expect(response.status()).toBe(200);
  expect(responseBody.data.id).toBe(2);
  console.log(responseBody.data.id);
  expect(responseBody.data.first_name).toBe("Janet")
  console.log(responseBody.data.first_name);
  expect(responseBody.data.email).toBe("janet.weaver@reqres.in");
  console.log(responseBody.data.email);
  expect(responseBody.data.last_name).toBe("Weaver")
  console.log(responseBody.data.last_name)
  expect(responseBody.data.avatar).toBe("https://reqres.in/img/faces/2-image.jpg")
  console.log(responseBody.data.avatar)
  expect(responseBody.support.text).toBe("Tired of writing endless social media content? Let Content Caddy generate it for you.")
  console.log(responseBody.support.text)
})

/**
 * {
    "data": {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://reqres.in/img/faces/2-image.jpg"
    },
    "support": {
        "url": "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
        "text": "Tired of writing endless social media content? Let Content Caddy generate it for you."
    }
}
 */