1. CNN을 이용한 Deep learning 을  python으로 구현
   1. 모델을 생성하고 학습을 진행하는 부분까지 구현
   2. 이렇게 학습한 내용을 file로 저장
   3. 파일에 저장되는 내용은 Tensorflow 그래프와 Variable 데이터 둘 다 저장 가능



2. Web application 작성 ( java servlet ) 

   WAS : tomcat 7.0

   1. workspace 설정 

      - 윈도우 >> 프리퍼런스 >> 제너럴 >> 워크스페이스 >> 맨 하단 인코딩 디폴트 -> other utf-8
      - 윈도우 >> 프리퍼런스 >> 제너럴 >> 웹 브라우저 >> 익스터널 웹브라우저 체크 >> 박스안에 크롬 체크
      - 웹 >> utf-8

   2.  tensorflow_jni.dll을 workspace에 로딩

      - java library path를 잡아주는 것이 가장 좋음 

        ​			C:\python_ML\DLL\tensorflow_jni.dll 위치

      - JVM에게 파일 위치를 알려줘야 함

         vm이 기동될 때 argments로 넘겨준 dll을 이용해서 특정 개체들을 loading함

        - 윈도우 >> 프리퍼런스 >> 자바 >> 인스톨드JREs >> JRE 클릭해서 EDIT 활성화 >> EDIT >> 디폴트 아규먼트 : -Djava.library.path=C:\python_ML\DLL >> 피니시
        - arguments  " -Djava.library.path=C:\python_ML\DLL\tensorflow_jni.dll"

      - https://tomcat.apache.org/download-70.cgi - core:64bit windows.zip

        - tomcat server 링크

        

   => 기본적인 설정 후 round trip 방식의 web application 작성

   

   3. Dynamic web project 생성

      1. context Root : client(사용자가)가 우리 프로젝트를 web상에서  지칭하는, 찾을 수 있도록 하는 프로젝트 논리적인 이름

         - properties - web project settings - context root 명 변경 가능

      2. context directory : html, css 등의 파일 dir

      3. Servlet 생성 : web상에서 작동하는 java 프로그램

         - URL mappings: /sample

      4. client가 server에 접속할 때 web server에 먼저 접근 port : 8080

         -> context root -> URL mapping 주소로 이동

         

      5. servlet 동작 순서 (excel 참고)

         1. servlet container가 sample이라고 하는 class 객체가 있는지 확인

            처음에는 sample 객체가 없고 비어있음

         2. servlet container가 server쪽 어딘가에서 class 읽어와 sample 객체 만듦

         3. thread pool에서 해당 sample 객체를 실행할 thread를 만듦

         4. post, get 방식에 따라 thread 수행

         5. client 요청을 수행한 후 3,4 번의 화살표 동작과 thread 객체가 사라짐 / sample 객체는 남아있음

         6. 다른 client의 요청이 오면 남아있는 simple 객체를 이용하고 thread만 새로 생성

      6. GET 방식으로 호출

         - browser의 주소창에 서버쪽 호출 url을 입력해서 서버쪽 프로그램 호출

           -> HTTP://localhost:8080/context root/URL mapping

         - servlet의 doGet method가 호출됨

           -> 입력 받고, logic 처리, 출력 처리 수행함

         - tomcat에 의해서 우리 프로젝트가 서비스 되어야 함

           -> deploy : tomcat이 프로젝트를 웹으로 publish 함

      

      => Round trip 방식의 Web application 실행 됨 

      => 단점 

      - 화면이 refresh 됨
      - client가 받아 보는 결과를 처리하기 쉽지 않음

      - html 구조로 새롭게 화면을 열어줌

      - jsp == servlet 동작 구조 완벽히 동일

      ​		jsp 내에서 servlet 동작 구조를 이용함

      - 예전에는 무리 없이 jsp로 프로그램 작성

      - but, web browser는 하는 일 없이 

        서버에 request를 하고 서버가 보내준 response 내용을 rendering만 해줌

      - 모든 데이터(jsp, css 등...)가 서버쪽에서 생성돼서 네트워크를 통해

        클라이언트에게 전송되는 구조 -> 서버 부하가 가중 되지만 네트워크 이용시 돈을 내지 않기 때문에 상관없었음! 

        

      => But, pc 위주에서 모바일 (device) 위주의 시대로 변화함

      ​	 네트워크 통신시 패킷당 요금 부과 됨

      변화>

      - 서버와 클라이언트가 주고 받는 데이터 사용량을 최소화 할 필요성 생김

        json 형식으로 데이터만 주고받음 

      - server쪽 프로그램만 만들던 과거와 비교해

        server쪽 프로그램(back end)과 browser(client)쪽 프로그램을 나눠 작성

        클라이언트 쪽 프로그램 즉, front-end 프로그램을 따로 작성하게 됨 

        -> HTML5로 작성  ( react.js /  view.js  /  angular ) ->  javascript 사용

      - 데이터만 주고 받기 때문에 요즘엔 UI , 화면을 담당하는 jsp를 사용하지 않음

      - 서버와 클라이언트의 통신이 jsp에서 비동기 방식의 ajax 통신으로 바껴서

        AJAX 방식으로 프로그램 작성

        AJAX : XML을 사용해 서버와의 통신을 가능하게 해주는 Javascript 통신 기능

      -  순수 javascript ajax는 구현이 복잡하고 유지보수가 어려움

        -> jQuery를 이용

      

ctrl+F5 : 캐쉬에 있는 결과 말고 새로 업데이트

==========================================================================

1. 클라이언트 프로그램 (HTML,  CSS, Javascript => HTML5)을 jQuery 기반으로 작성

   => 예측하고 싶은 이미지를 선택해서 이 이미지의 픽셀 데이터를 추출 by javascript

   =>  [1,784] 형태의 픽셀 데이터를 서버에 전송

   ​	   (파일 형태로 전송시 서버가 해야할 일이 많아져서 서버의 부하가 가중됨)

   

2. 서버쪽 프로그램을 작성

   => 클라이언트가 보내준   [1,784] 형태의 픽셀 데이터를

   ​	 cnn 딥러닝 모델을 이용해서 prediction 후 결과 데이터를 클라이언트에게 전송



​		