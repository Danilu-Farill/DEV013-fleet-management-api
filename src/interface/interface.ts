export interface ITrajectories {
    id: number,
    date: string,
    latitude: number,
    longitude: number
}

export interface IQuery {
    take: number | null,
    skip: number | null,
}

export enum Respuesta {
    si = 1,
    no = 2
}

/*

Parece que el problema radica en la forma en que estás manejando las zonas horarias. Cuando conviertes la cadena de fecha y hora a un objeto Date, está considerando la hora en UTC, lo cual podría estar causando el desfase que observas.

Para asegurarte de que la fecha y hora se guarden correctamente en el formato timestamp with time zone, puedes usar una biblioteca como date-fns o moment-timezone para manejar la zona horaria adecuadamente. Aquí te mostraré un ejemplo usando date-fns:

Primero, instala date-fns:

bash
Copiar código
npm install date-fns
Luego, modifica tu código para que convierta correctamente la fecha y hora considerando la zona horaria adecuada:

typescript
Copiar código
import { parse, format } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

for (const files of fileSpace) {
  const filesSplit: string[] = files.split(",");
  if(type === "taxis" && filesSplit.length === 2) {
    const id: number = parseInt(filesSplit[0]); 
    const plate: string = filesSplit[1];
    fileCreateTaxis.push({id: id, plate: plate});
  } else if(type === "trajectories" && filesSplit.length === 4) {
    const spaces: string[] = files.split(/\s*,\s*);
    if(spaces.length === 0) { // Verifica si spaces tiene elementos; si no, retorna.
        return;
      }
      const dateString = filesSplit[1];
      const taxi_id: number = parseInt(filesSplit[0]); 
  
      // Parse the date string to a Date object
      const parsedDate = parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
  
      // Assuming the input date is in the local timezone, convert it to UTC
      const utcDate = zonedTimeToUtc(parsedDate, 'Your/LocalTimezone'); // Replace 'Your/LocalTimezone' with your actual timezone
  
      const latitude: number = parseFloat(filesSplit[2]);
      const longitude: number = parseFloat(filesSplit[3]);
      fileCreateTrajectories.push({taxi_id: taxi_id, date: utcDate, latitude: latitude, longitude: longitude});
    }
  }
  
  // Replace 'Your/LocalTimezone' with the timezone of the input date strings, for example, 'America/Mexico_City'
  Explicación:
  parse(dateString, 'yyyy-MM-dd HH:mm
  ', new Date()): Esta función de date-fns convierte la cadena de fecha y hora en un objeto Date. Aquí se asume que la fecha en la cadena es local.
  
  zonedTimeToUtc(parsedDate, 'Your/LocalTimezone'): Esta función de date-fns-tz convierte el objeto Date en una fecha UTC considerando la zona horaria especificada.
  
  Reemplaza 'Your/LocalTimezone' con la zona horaria adecuada, como 'America/Mexico_City' si tus datos están en la zona horaria de la Ciudad de México.
  
  Este enfoque asegura que la fecha y hora se almacenen correctamente en UTC en tu base de datos timestamp with time zone.
*/