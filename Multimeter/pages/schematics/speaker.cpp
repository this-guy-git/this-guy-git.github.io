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
    tone(10, 3000);
  }
  if (connected == HIGH) {
    noTone(10);
  }
}