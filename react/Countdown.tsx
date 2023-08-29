import React, { useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useQuery } from "react-apollo";

import { getTwoDaysFromNow, tick } from "./utils/time";
import type { TimeSplit } from "./typings/global";
import productReleaseDate from "./graphql/productReleaseDate.graphql";

const DEFAULT_TARGET_DATE = getTwoDaysFromNow();

const CSS_HANDLES = ["countdown"];

const Countdown: StorefrontFunctionComponent = () => {
  const { data, loading, error } = useQuery(productReleaseDate);

  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const handles = useCssHandles(CSS_HANDLES);
  const results = data?.products as unknown as Array<{
    authors: string;
    cacheId: string;
    id: string;
    name: string;
  }>;

  // eslint-disable-next-line no-console
  console.log(timeRemaining);
  tick(DEFAULT_TARGET_DATE, setTime);
  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <span>Error</span>
      </div>
    );
  }

  return (
    <div className={`${handles.countdown} db tc`}>
      <p>hhhh</p>
      {results?.map((product) => (
        <div>{product.name}</div>
      ))}
    </div>
  );
};

Countdown.schema = {
  title: "editor.countdown.title",
  description: "editor.countdown.description",
  type: "object",
  properties: {
    targetDate: {
      title: "Final date",
      description: "Final date used in the countdown",
      type: "string",
      default: null,
    },
  },
};

export default Countdown;
