#include <LiquidCrystal.h>
// LCD
const int rs = 7, en = 6, d4 = 5, d5 = 4, d6 = 3, d7 = 2;

// Voltmeter
int voltageraw = 0;
float vlt = 0;
String value = "";
String label = "";
// Resistance
int rRaw = 0;
float Vout = 0;
float R1 = 100.0;
float R2 = 0;
float buffer = 0;
// Set mode
/*
 - 0 = Voltmeter
 - 1 = Continuity
 - 2 = Resistance
*/
int mode = -1;
// Setup Screen
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

void setup()
{
  // Digital Pins
  pinMode(13, INPUT);
  pinMode(12, INPUT);
  pinMode(11, INPUT);
  pinMode(10, INPUT);
  pinMode(9, INPUT_PULLUP);
  pinMode(8, OUTPUT);
  // Analog Pins
  pinMode(A0, INPUT);
  pinMode(A5, INPUT);
  // Serial Output
  Serial.begin(9600);
  
  lcd.begin(16, 2);
}

void loop()
{
  if (digitalRead(13) == HIGH) {
    digitalWrite(8, HIGH);
    mode = 0;
  } else if (digitalRead(12) == HIGH){
    digitalWrite(8, LOW);
    mode = 1;
  } else if (digitalRead(11) == HIGH) {
    digitalWrite(8, HIGH);
    mode = 2;
  }
  switch (mode) {
    case 0: // mode 0 is voltmeter
   		voltmeter();
    	break;
    case 1: // mode 1 is resistance
    	resistance();
    	break;
    case 2: // mode 3 is continuity check
    	continuity();
    	break;
    default: // no mode selected, show this on screen
		digitalWrite(8, HIGH);
    	lcd.setCursor(0,0);
    	lcd.print("Select a mode");
    	break;
  }
  Serial.println("MODE:");
  Serial.println(mode);
}

void continuity()
{
  int connected = digitalRead(9);

  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("CONTINUITY");

  if (connected == LOW)
  {
    lcd.setCursor(0,1);
    lcd.print("CONNECTED");
  }
  delay(1000);
}

void resistance()
{
  lcd.clear();
  long sum = 0;

  for(int i=0;i<10;i++){
  	sum += analogRead(A5);
  }

  rRaw = sum / 10;
  Serial.print("Raw Resistance: ");
  Serial.println(rRaw);
  float vcc = 5;
  if (rRaw > 0) {
    R2 = ((R1 * (1023.0 / rRaw - 1.0) - 15.0) / 1.1437);
    // very bad fix but it works
    if (rRaw <= 82) {
    	R2 += 10;
    }
    if (R2 >= 1000) {
      R2 /= 1000;
      if ((int)R2 == 1) {
      	label = " kOhm";
      } else {
        label = " kOhms";
      }
    } else {
      if ((int)R2 == 1) {
      	label = " Ohm";
      } else {
        label = " Ohms";
      }
    }
    Serial.print("Unrounded Resistance: ");
    Serial.println(R2);
    Serial.print("Resistance: ");
    Serial.println((int)R2);
    lcd.setCursor(0,0);
    lcd.print("RESISTANCE: ");
    lcd.setCursor(0,1);
    lcd.print((int)R2);
    lcd.print(label);
  }
  delay(1000);
}

void voltmeter()
{
  lcd.clear();
  lcd.print("VOLTAGE:");
  voltageraw = analogRead(A0);
  Serial.println("RAW VOLTAGE:");
  Serial.println(voltageraw);
  vlt = (voltageraw * (5.0 /1023.0) * (118.0 / 18.0) + 1.0);
  float vltcmp = vlt;
  if (voltageraw == 0) {
    if (voltageraw == 0) {
    	vlt = 0;
    } if (vlt < 1) {
      value = "V";
    } else {
    	vlt *= 1000;
    	value = "mV";
    }
  } else {
    value = "V";
  }
  if (vltcmp < 31.0) {
    lcd.setCursor(0,1);
  	lcd.print((int)vlt);
  	lcd.print(value);
  } else {
    lcd.setCursor(0,1);
    lcd.print("TOO HIGH");
  }
 
  Serial.println("VOLTAGE:");
  Serial.print(vlt);
  Serial.println(value);
  delay(1000);
}
