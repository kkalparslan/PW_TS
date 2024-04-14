import{test,expect}  from '@playwright/test';


test.describe("Dialogs",()=>{

  test.beforeEach(async({page})=>{
     await page.goto("https://testautomationpractice.blogspot.com/");

  })

  test("Alert",async({page})=>{
    
    page.on("dialog", dialog=>{ /**
    playwright default olarak alert leri (dialog pencerelerini) dismiss ile handle etsede bazen buralarda işlem yapmak isteyebiliriz. 
    Bu nedenle bize de handle etme imkanı verilmiştir. Bu doğrultuda öncelikle window handele ı tanımlamak 
    gerekiyor. Bu window handler 2 parametre alıyor; birincisi string olarak "dialog" keywordu, ikincisi ise 
    ilgili bir keyword giriyoruz. dialog un bir instance ı gibi. sonra bu dialog penceresinin tipini mesajını 
    doğrulayabiliriz. bu tanımlamaları window handler ın içinde tanımladıktan sonra da bu diaolg penceresini 
    tetikleyen butona tıklıyoruz ve tanımlı işlemler gerçekleşmiş oluyor.
     */
        
       expect(dialog.type()).toBe("alert"); //bu dialog tipinin alert olduğunu doğruluyoruz.
       expect(dialog.message()).toBe("I am an alert box!");//alerti texti ile doğruladık
       
       dialog.accept()
    })
    await page.click("//button[text()='Alert']");
  })

  test("Confirm box",async({page})=>{
    
    page.on("dialog",dialog=>{
       expect(dialog.type()).toBe("confirm");
       expect(dialog.message()).toBe("Press a button!");
      //dialog.accept();
      dialog.dismiss();
    })

    await page.getByText("Confirm Box").click();
    const resultText=page.locator("#demo");

    expect(await resultText.textContent()).toBe("You pressed Cancel!");
  })

  test("Prompt",async({page})=>{
    let promptValue:string;
    promptValue="Azra"; //prompvalue yu dinamik hale getirdik.
    page.on("dialog",dialog=>{
       expect(dialog.type()).toBe("prompt");
       expect(dialog.message()).toBe("Please enter your name:");
       expect(dialog.defaultValue()).toBe("Harry Potter");
       dialog.accept(promptValue)
     // dialog.dismiss();

    })
    await page.getByText("Prompt").click();
    const resultText=page.locator("#demo");
    expect(await resultText.textContent()).toBe(`Hello ${promptValue}! How are you today?`);
    /**
     JavaScript dilinde, interpolation genellikle template literals (tilda->alt gr ile birlikte virgül tuşu) 
     kullanılarak yapılır. Template literals, backtick (`) karakteriyle tanımlanan ve içine değişkenlerin veya 
     ifadelerin ${} içine yerleştirilebildiği stringlerdir.
     */
  })


  test("Prompt dismiss",async({page})=>{
    let promptValue:string;
    promptValue="Faruk";
    page.on("dialog",dialog=>{
       expect(dialog.type()).toBe("prompt");
       expect(dialog.message()).toBe("Please enter your name:");
       expect(dialog.defaultValue()).toBe("Harry Potter");
       //dialog.accept(promptValue)
       dialog.dismiss();
    })
    await page.getByText("Prompt").click();
    const resultText=page.locator("#demo");

    expect(await resultText.textContent()).toBe("User cancelled the prompt.");
  })
})