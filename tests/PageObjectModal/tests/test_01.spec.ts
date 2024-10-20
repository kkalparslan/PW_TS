import { test } from '@playwright/test';
import Home from '../Pages/HomePage';
import * as data from '..\\TestData\\data.json';

test("Page accecibility test", async ({ page, baseURL }) => {
  const home = new Home(page);

  /**baseUrl i kullanmanın bir yolu var; direk baseUrl yazılarak kullanılmaz çünkü hata verir
   * Bunu string interpolation yaparken kullanabiliriz ancak. 
   * JavaScript'te string interpolation, bir dize içinde değişken veya ifadelerin doğrudan 
    kullanıldığı bir yöntemdir. Bu, genellikle template literals (şablon dizileri) kullanılarak 
    yapılır. Template literals, backtick işaretleri (`) ile yazılır ve ${} kullanarak değişkenler 
    veya ifadeler interpolasyon yapılır. 
   * TypeScript'teki string interpolation, JavaScript'teki kullanımına çok benzerdir çünkü TypeScript,
    JavaScript'in bir süperseti olarak çalışır. Dolayısıyla, template literals ve ${} kullanımı 
    TypeScript'te de aynıdır.
    Ancak TypeScript'in avantajı, tip güvenliği sağlamasıdır. Bu, interpolasyon yapılan değişkenlerin
    veya ifadelerin beklenen türlere sahip olup olmadığını derleme zamanında kontrol edebilmenizi 
    sağlar.
    */

  await home.navigateToTheSite(`${baseURL}`)
  //await home.verifyTheAccessibility(`${baseURL}`); //config.ts ten alırsak url i bu şekilde kullanıyoruz
  await home.verifyTheAccecibility(data.url); //test data ya girersem de bu şekilde kullanıyoruz.

  /**
   * testi terminalden çalıştırdım ama sadece bu testi test run ile çalıştıramadım.
   * "The test run did not record any output" sonucu veriyor. Faruk hocaya sorayım.
   */
})