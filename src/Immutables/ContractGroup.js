import Immutable from '../Types/Immutable';
import FullName from '../Types/FullName'; /* eslint-disable-line no-unused-vars */
import DateRange from '../Types/DateRange'; /* eslint-disable-line no-unused-vars */
import DurationRange from '../Types/DurationRange'; /* eslint-disable-line no-unused-vars */

/**
 * @typedef {Object} SpotDurations
 *
 * @property {DurationRange} daily
 * @property {DurationRange} intraday
 * @property {DurationRange} tick
 */

/**
 * @typedef {Object} ForwardDurations
 *
 * @property {DurationRange} intraday
 */

/**
 * @typedef {Object} Durations
 *
 * @property {SpotDurations} spot
 * @property {ForwardDurations} forward
 */

/**
 * @typedef {Object} Units
 *
 * @property {FullName} spot
 * @property {FullName} forward
 */

/** A container for contract group info */
export default class ContractGroup extends Immutable {
    /** @returns {String} - contract name */
    get name() {
        return this._data.name;
    }

    /** @returns {Number[]} - List of barriers */
    get barriers() {
        return this._data.barriers;
    }

    /** @returns {String} - 'stake' or 'payout' */
    get basis() {
        return this._data.basis;
    }

    /** @returns {String[]} - List of available contract types */
    get contractTypes() {
        return this._data.contractTypes;
    }

    /** @returns {Durations} - Durations for spot and forward starting contracts */
    get durations() {
        return this._data.durations;
    }

    /** @returns {Units} - Units for spot and forward starting contracts */
    get units() {
        return this._data.units;
    }

    /** @returns {DateRange[]} - Durations for forward starting contracts */
    get forwardSessions() {
        return this._data.forwardSessions;
    }

    /** @returns {Boolean} */
    get isForwardStarting() {
        return this._data.forwardSessions.length;
    }
}