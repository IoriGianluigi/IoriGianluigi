#include<Wire.h>


const int MPU = 0x68; // I2C address of the MPU-6050
int16_t AcX, AcY, AcZ, Tmp, GyX, GyY, GyZ;

void setup() {
  Wire.begin();
  Wire.beginTransmission(MPU);
  Wire.write(0x6B);  // PWR_MGMT_1 register
  Wire.write(0);     // set to zero (wakes up the MPU-6050)
  Wire.endTransmission(true);
  Serial.begin(9600);
  Serial.begin(9600);

}
void loop() {
  Wire.beginTransmission(MPU);
  Wire.write(0x3B);  // starting with register 0x3B (ACCEL_XOUT_H)
  Wire.endTransmission(false);
  Wire.requestFrom(MPU, 14, true); // request a total of 14 registers
  AcX = Wire.read() << 8 | Wire.read(); // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
  AcY = Wire.read() << 8 | Wire.read(); // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
  AcZ = Wire.read() << 8 | Wire.read(); // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
  Tmp = Wire.read() << 8 | Wire.read(); // 0x41 (TEMP_OUT_H) & 0x42 (TEMP_OUT_L)
  GyX = Wire.read() << 8 | Wire.read(); // 0x43 (GYRO_XOUT_H) & 0x44 (GYRO_XOUT_L)
  GyY = Wire.read() << 8 | Wire.read(); // 0x45 (GYRO_YOUT_H) & 0x46 (GYRO_YOUT_L)
  GyZ = Wire.read() << 8 | Wire.read(); // 0x47 (GYRO_ZOUT_H) & 0x48 (GYRO_ZOUT_L)

  //Serial.print("Accelerometer: ");
  //Serial.print("X = "); Serial.println(AcX);
  //Serial.print(" | Y = "); Serial.println(AcY);
  //Serial.print(" | Z = "); Serial.println(AcZ);

  
  //delay(333);


  if ( AcX > 10000){
    Serial.println("A");
    Serial.write("A");
  }
   if(AcX < -10000){
    Serial.println("I");
    Serial.write("I");
   }
   if(AcY > 10000){
    Serial.println("S");
    Serial.write("S");
   }
   if(AcY < -10000){
    Serial.println("D");
    Serial.write("D");
   }
   if((AcX < 7000) && (AcX > -7000) && (AcY < 7000) && (AcY > -7000)){
   Serial.println("X");
   Serial.write("X");
   }
/*
   if ( AcX > 10000)  Serial.write("A");
   if(AcX < -10000)   Serial.write("I");
   if(AcY > 10000)   Serial.write("S");
   if(AcY < -10000)   Serial.write("D");
   if((AcX < 7000) && (AcX > -7000) && (AcY < 7000) && (AcY > -7000))  Serial.write("X");
  */
   
}