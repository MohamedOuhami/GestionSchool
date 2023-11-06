package ma.projet.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
public class Student extends User {
	
	private String name;
	private int phone;
	private String email;

	@ManyToOne
	private Filiere filiere;


}
