import * as _ from 'lodash';
import knex from '../providers/database';
// import ModelError from '../utils/model_error';

import { IShowtime, IQueryShowtime } from '../interfaces/showtime';

export const tableName = 'showtimes';

class Showtime {
  public async create(showtime: IShowtime): Promise<void> {
    try {
      await knex('showtimes').insert(showtime);
    } catch (err) {
      throw err;
    }
  }

  public async update(
    showtime_id: number,
    showtime: IShowtime,
  ): Promise<number> {
    try {
      const filteredMovie = _.pickBy(showtime, _.identity); // remove all falsy property
      return await knex('showtimes')
        .update(filteredMovie)
        .where('showtime_id', showtime_id);
      //
    } catch (err) {
      throw err;
    }
  }

  public async delete(showtime_id: number): Promise<number> {
    try {
      return await knex('showtimes').where('showtime_id', showtime_id).del();
    } catch (err) {
      throw err;
    }
  }

  public async getShowtimesByMovieId(
    movie_id: number,
  ): Promise<IQueryShowtime[]> {
    try {
      return await knex('showtimes')
        .select('showtime_id', 'start_time', 'movies.movie_id')
        .join('movies', 'movies.movie_id', 'showtimes.movie_id')
        .where('movies.movie_id', movie_id);

      //
    } catch (err) {
      throw err;
    }
  }
}

export default new Showtime();