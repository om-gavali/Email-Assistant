package Main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application.properties")
public class EmailAssistantApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmailAssistantApplication.class, args);
	}

}
